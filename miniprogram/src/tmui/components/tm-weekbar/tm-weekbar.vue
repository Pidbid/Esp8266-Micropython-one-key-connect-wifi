<template>
    <tm-sheet :follow-dark="props.followDark" :follow-theme="props.followTheme" :dark="props.dark" :shadow="props.shadow" :round="props.round" :padding="[12,24]" :color="props.color">
        <view class="flex flex-row flex-row-center-center">
            <view @click.stop="prevWeek" class="opacity-7">
                <tm-icon :font-size="28" :userInteractionEnabled="false" name="tmicon-angle-left"></tm-icon>
            </view>
            <view class="flex-1 flex flex-row" style="width:0px">
                <view @click.stop="changeDate(item.date)" :class="[item.date == _value ?'':'opacity-7']" class="flex-1 flex flex-col flex-col-center-center" v-for="(item,index) in nowWeekDayArray" :key="index">
                    <tm-text :color="item.date == _value ?props.activeColor:''" :userInteractionEnabled="false" :font-size="23" :label="weekStr[index]"></tm-text>
                    <tm-text :color="item.date == _value ?props.activeColor:''" :userInteractionEnabled="false" :font-size="23" :label="item.str"></tm-text>
                </view>
            </view>
            <view @click.stop="nexWeek" class="opacity-7">
                <tm-icon  :font-size="28" :userInteractionEnabled="false" name="tmicon-angle-right"></tm-icon>
            </view>
        </view>
    </tm-sheet>
</template>
<script lang="ts" setup>
/**
 * 时间周
 * @description 按周显示可选的日期。
 */
import {computed, ref, watch} from "vue"
import { custom_props, computedTheme, computedClass, computedStyle, computedDark } from '../../tool/lib/minxs';
import tmSheet from '../tm-sheet/tm-sheet.vue';
import tmIcon from '../tm-icon/tm-icon.vue';
import tmText from "../tm-text/tm-text.vue";
import * as dayjs from "../../tool/dayjs/esm/index"
import isoWeek from "../../tool/dayjs/esm/plugin/isoWeek/index"
import isSameOrBefore from "../../tool/dayjs/esm/plugin/isSameOrBefore/index"
/**
 * 事件说明
 * change 点击日期时触发,
 * v-model 双向绑定当前选中的日期。
 */
const emits = defineEmits(["change","update:modelValue"])
const props = defineProps({
    ...custom_props,
    transprent:{
        type:Boolean,
        default:false
    },
    round:{
        type:Number,
        default:3
    },
    shadow:{
        type:Number,
        default:3
    },
    defaultValue:{
        type:[String,Date,Number],
        default:()=>''
    },
    modelValue:{
        type:[String,Date,Number],
        default:()=>''
    },
    color:{
        type:String,
        default:'white',
    },
    activeColor:{
        type:String,
        default:'primary',
    }
})
const DayJs = dayjs.default;
DayJs.extend(isoWeek)
DayJs.extend(isSameOrBefore)
const _value = ref(DayJs(props.defaultValue).isValid()?DayJs(props.defaultValue).format("YYYY-MM-DD"):DayJs().format("YYYY-MM-DD"))
const nowWeek = ref(getweek_s_e('now',_value.value))
const nowWeekDayArray = computed(()=>getAllDay(nowWeek.value[0],nowWeek.value[1]))
const weekStr = ['周一','周二','周三','周四','周五','周六','周日']

watch(()=>props.modelValue,()=>{
    if(DayJs(props.modelValue).isValid()){
        
         _value.value = DayJs(props.modelValue).format("YYYY-MM-DD")
         nowWeek.value = getweek_s_e('now',_value.value)
    }
})
function changeDate(date:string){
    _value.value = date;
    emits('update:modelValue',date)
    emits('change',date)
}
function nexWeek(){
    nowWeek.value = getweek_s_e('next')
}
function prevWeek(){
    nowWeek.value =  getweek_s_e('prev')
}

//获取周始和结束的时间值。
function getweek_s_e(type='next',daytime:String|Date|Number = ''){
    if(type=='next'){
        let date = DayJs(nowWeek.value[1]).add(1,'week')
        return [date.startOf('isoWeek').format('YYYY-MM-DD'),date.format('YYYY-MM-DD')]
    }else if(type == 'prev'){
        let date = DayJs(nowWeek.value[0]).subtract(1,'week')
        return [date.format('YYYY-MM-DD'),date.endOf('isoWeek').format('YYYY-MM-DD')]
    }else{
        
        if(!DayJs(daytime).isValid()){
            return [DayJs().startOf('isoWeek').format('YYYY-MM-DD'),DayJs().endOf('isoWeek').format('YYYY-MM-DD')];
        }else{
            return [DayJs(daytime).startOf('isoWeek').format('YYYY-MM-DD'),DayJs(daytime).endOf('isoWeek').format('YYYY-MM-DD')];
        }
        
    }
    
}

//根据开始和结束的时间获取这一段时间内的日期数组。
function getAllDay(start:string,end:string){
    let ar = [];
    let endD = DayJs(end);
    let startd = DayJs(start)
    while(startd.isSameOrBefore(endD)){
        ar.push({
            date:startd.format("YYYY-MM-DD"),
            str:startd.format("MM/DD")
        })
        startd = startd.add(1,'day')
    }
    return ar
}
</script>
