<template>
    <view>
        <scroll-view v-if="_showHeader" :enable-flex="isNvue" :class="[isNvue ? 'flex-row flex' : 'tableHeader']" :scroll-x="true"
            :scroll-with-animation="false" :show-scrollbar="false" @scroll="tableScroll" @touchstart="scrollDong = 't'"
            @mouseup="scrollDong = 't'" :scroll-left="headerLeft"
            :style="{ width: `${defaultProps.width}rpx`, height: `${defaultProps.headerHeight}rpx` }">
            <!-- #ifndef APP-NVUE -->
            <view class="flex-1 flex-row flex-nowrap">
                <tm-sheet  :border="_showBottomBorder?1:0" border-direction="bottom" :color="item.bgColor" :text="item.light" :_class="'flex flex-col ' + item.align"
                    :height="defaultProps.headerHeight" :width="item.width" v-for="(item, index) in _col" :key="index"
                    :margin="[0, 0]" :padding="[10, 6]">
                    <tm-text _style="line-height:normal;" :font-size="26" _class="text-weight-b" :label="item.title">
                    </tm-text>
                </tm-sheet>
            </view>
            <!-- #endif -->
            <!-- #ifdef APP-NVUE -->
            <tm-sheet  :border="_showBottomBorder?1:0" border-direction="bottom" :color="item.bgColor" :text="item.light" :_class="'flex  ' + item.align"
                :height="defaultProps.headerHeight" :width="item.width" v-for="(item, index) in _col" :key="index"
                :margin="[0, 0]" :padding="[10, 6]">
                <tm-text _style="line-height:normal;" :font-size="26" _class="text-weight-b"  :label="item.title">
                </tm-text>
            </tm-sheet>
            <!-- #endif -->

        </scroll-view>

        <!-- #ifndef APP-NVUE -->
        <scroll-view :scroll-with-animation="false" @scroll="headerScroll($event, 0)" @touchstart="touchStartScroll(0)"
            @mouseup="touchStartScroll(0)" :scroll-x="true" :scroll-y="true" :scroll-left="tableLeft[0]"
            :style="[defaultProps.height ? { height: `${defaultProps.height}rpx` } : '', { width: `${defaultProps.width}rpx` }]">

            <view class="flex flex-row flex-nowrap" v-for="(item2, index2) in _tabel" :key="index2" :margin="[0, 0]">

                <tm-sheet  :border="_showBottomBorder?1:0" border-direction="bottom" v-for="(item, key, index) in item2.data" :key="index" :margin="[0, 0]"
                    :color="item2.color || _col[index]?.cellColor" :text="item2.light || _col[index]?.light"
                    :_class="'flex flex-row ' + item2.align" :height="defaultProps.cellHeight" :width="item2.width"
                    :padding="[10, 6]">
                    <tm-text :font-size="24" :label="item"></tm-text>
                </tm-sheet>
            </view>

        </scroll-view>

        <!-- #endif -->

        <!-- #ifdef APP-NVUE -->
        <scroll-view :scroll-with-animation="false" :enable-flex="isNvue" :class="[isNvue ? 'flex-col flex' : '']"
            :scroll-y="true"
            :style="[defaultProps.height ? { height: `${defaultProps.height}rpx` } : '', { width: `${defaultProps.width}rpx` }]">
            <scroll-view :scroll-with-animation="false" @scroll="headerScroll($event, index2)"
                @touchstart="touchStartScroll(index2)" @mouseup="touchStartScroll(index2)"
                :scroll-left="tableLeft[index2]" :show-scrollbar="false" :enable-flex="isNvue"
                :class="[isNvue ? 'flex-row flex' : '']" :scroll-x="true" :style="[
                    { width: `${defaultProps.width}rpx` }
                ]" v-for="(item2, index2) in _tabel" :key="index2" :margin="[0, 0]">
                <view class="flex flex-row flex-nowrap">
                    <tm-sheet :border="_showBottomBorder?1:0" border-direction="bottom" v-for="(item, key, index) in item2.data" :key="index" :margin="[0, 0]"
                        :color="item2.color || _col[index].cellColor" :text="item2.light || _col[index].light"
                        :_class="'flex ' + item2.align" :height="defaultProps.cellHeight" :width="item2.width"
                        :padding="[10, 6]">
                        <tm-text :font-size="24" :label="item"></tm-text>
                    </tm-sheet>
                </view>
            </scroll-view>
        </scroll-view>
        <!-- #endif -->




    </view>
</template>
<script lang="ts" setup>
/**
 * 表格
 * @description 本组件定位为简单展示使用，非专业表格组件，请知悉！
 * 大多数场景展示基本是简单的表格展示而非复杂的表格组件，因此这个场景使用还是很合理的。
 */
import { headresItem, cellItem } from "./interface";
import { computed, nextTick, onMounted, PropType, Ref, ref, toRaw, watchEffect } from "vue";
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmText from "../tm-text/tm-text.vue";
const props = defineProps({
    showHeader:{
        type:Boolean,
        default:true
    },
    header: {
        type: Array as PropType<Array<headresItem>>,
        default: () => [],
    },
    tableData: {
        type: Array as PropType<Array<cellItem>>,
        default: () => [],
        required:true
    },
    width: {
        type: Number,
        default: 750
    },
    //如果提供了高度，将产生上下滑动的表格。
    height: {
        type: Number,
        default: 0
    },
    //单元格的高度。
    cellHeight: {
        type: Number,
        default: 72
    },
    //头部的高度。
    headerHeight: {
        type: Number,
        default: 88
    },
    showBottomBorder:{
        type:Boolean,
        default:true
    }
})
const defaultProps = computed(() => {
    return {
        width: props.width,
        height: props.height,
        cellHeight: props.cellHeight,
        headerHeight: props.headerHeight
    }
})
const _col: Ref<Array<headresItem>> = ref([]);
const _tabel: Ref<Array<cellItem>> = ref([]);
const _showBottomBorder = computed(()=>props.showBottomBorder)
const _showHeader = computed(()=>props.showHeader)
const isNvue = ref(false);
// #ifdef APP-NVUE
isNvue.value = true;
// #endif

const headerLeft = ref(0);

const tableLeft: Ref<Array<number>> = ref([...new Array(props.tableData.length).fill(0)]);

let scrollDong = ref('')
let scrollIndex = ref(NaN)
function headerScroll(e: Event, index: number) {
    if (scrollDong.value != 'h') return;
    nextTick(() => {
        if (scrollIndex.value === index) {
            headerLeft.value = e.detail.scrollLeft
            tableLeft.value = tableLeft.value.map((el, idx) => {
                return idx !== index ? headerLeft.value : el;
            })
        }
    })

}
function tableScroll(e: Event) {
    if (scrollDong.value != 't') return;
    nextTick(() => {
        tableLeft.value = [...new Array(props.tableData.length).fill(e.detail.scrollLeft)];
    })
}

function touchStartScroll(index) {
    scrollIndex.value = index;
    scrollDong.value = 'h';
}
watchEffect(()=>{
    setColData()
})

function setColData() {
    _col.value = [];
    _tabel.value = [];
    props.header.forEach((el, index) => {
        _col.value.push({
            title: el?.title ?? "",
            width: el?.width ?? 145,
            align: "flex-col-center-" + (el?.align||"center"),
            sort: el?.sort ?? false,
            bgColor: el?.bgColor ?? 'white',
            cellColor: el?.cellColor ?? 'white',
            light: el?.light ?? false,
            key: el?.key ?? String(index)
        })
    })

    props.tableData.forEach((el, index) => {
        
        let d = el?.data ?? {};
        let keys = Object.keys(d);
        for(let ik=0,len=keys.length;ik<len;ik++){
            if(typeof _col.value[ik] == 'undefined'){
                _col.value.push({
                    title: String(ik),
                    width: el?.width ?? 145,
                    align: "flex-col-center-" + (el?.align||"center"),
                    sort: false,
                    bgColor: 'white',
                    cellColor: 'white',
                    light: false,
                    key:String(ik)
                })
            }
        }
        _tabel.value.push({
            color: el?.color ?? "",
            light: el?.light ?? false,
            data: el?.data ?? {},
            align: el?.align ?? _col.value[index]?.align??"flex-row-center-center",
            width: el?.width ?? _col.value[index]?.width??145,
            key: el?.key ?? String(index)
        })
    })
}
</script>
<style>
</style>