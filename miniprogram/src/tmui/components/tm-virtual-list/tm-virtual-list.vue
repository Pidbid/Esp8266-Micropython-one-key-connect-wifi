<template>
    <scroll-view :scroll-with-animation="true"  @scroll="scroll" :scroll-y="true" 
	:style="[{height:_height+'px','overflow-anchor':'auto',width:`${props.width}rpx`}]">
	<tm-translate>
		<view class="flex flex-col relative" :style="[{height:totalHeight_rpx+'rpx'}]">
		    <view class="absolute l-0 t-0 flex flex-col" :style="{transform:`translateY(${scrollTop}px)`,width:`${props.width}rpx`}">
		        <slot name="default" :data="virtualData"></slot>
		    </view>
		</view>
	</tm-translate>
       
    </scroll-view>
</template>
<script lang="ts" setup>
/**
 * 虚拟列表
 * @description 用来展示长列表数据使用，采用虚拟数据展示，只展示视窗内数据，其它不展示。因此上万条列表数据，也可以轻松展示。
 * @example 下面演示了加载1900张图片的示例
 * <tm-virtual-list :width="750" :height="800" :data="imglist" :itemHeight="160">
		<template v-slot:default="{data}">
			<tm-image-group >
				<tm-image :padding="[5,5]" preview :width="750" :height="150" :src="item" 
				v-for="(item,index) in data" :key="index"></tm-image>
			</tm-image-group>
		</template>
	</tm-virtual-list>
	-----js生成1900张图片链接。-----
	const imglist = ref([])
	for(let i=0;i<1900;i++){
		imglist.value.push('https://picsum.photos/200/300?id='+i)
	}
 */
import { ref,computed,nextTick } from "vue";
import tmTranslate from "../tm-translate/tm-translate.vue"
const props = defineProps({
    width: {
        type: Number,
        default: 300,
    },
    height: {
        type: Number,
        default: 500,
    },
    //预估项目的高度，必填。
    itemHeight: {
        type: Number,
        default: 0,
        required: true,
    },
    data: {
        type: Array,
        default: () => { },
    },
});
const _itemHeight = uni.upx2px(props.itemHeight);
const _height = uni.upx2px(props.height);
const _datalist = computed(()=>props.data)
//总共显示的个数。
const colNum = Math.ceil(_height / _itemHeight)
const totalHeight = computed(()=>_datalist.value.length*_itemHeight);
const totalHeight_rpx = computed(()=>_datalist.value.length*props.itemHeight);
const totalWidth = computed(()=>uni.upx2px(props.width))
const scrollHeight = ref(totalHeight.value);
const scrollTop = ref(0)
const newScrollTop = ref(0)
interface scrollDetailFace {
    deltaX: number,
    deltaY: number,
    scrollHeight: number,
    scrollLeft: number,
    scrollTop: number,
    scrollWidth:number,
}
const virtualData = ref([]);

function scroll(e:any){
    let _detail:scrollDetailFace = e.detail;
    scrollHeight.value = _detail.scrollHeight;
	newScrollTop.value = _detail.scrollTop<=0?0:_detail.scrollTop;
    scrollTop.value = _detail.scrollTop - (_detail.scrollTop % _height);
    rageData();
}
function rageData(){
    let start = Math.floor(newScrollTop.value / _itemHeight);
	let chaliang = newScrollTop.value- scrollTop.value
    let pushIndex = Math.floor(chaliang/ _itemHeight);
    start = start <=0?0:start;
    let end = start+colNum+pushIndex;
    end = end >= _datalist.value.length?_datalist.value.length:end;
    virtualData.value = <any>_datalist.value.slice(start,end)
}
rageData();
</script>
