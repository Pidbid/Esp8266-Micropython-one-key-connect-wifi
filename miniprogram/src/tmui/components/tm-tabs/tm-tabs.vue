<template>
	<view class="flex flex-col" :style="[
      props.height&&isDulitabs==false ? { height: height + 'rpx' } : '',
      { width: props.width + 'rpx' },
    ]">
	<!-- 此源码有uniapp bug.如果在nvue页面编译至h5平台时，开启enable-flexr后需要里面再套层view再写flex才能真正的开flex -->
	<!-- 因此下面的内容作了条件编译分为nvue和非nvue -->
	<!-- https://ask.dcloud.net.cn/question/143230 -->
		<view v-if="_tabPos=='bottom'&&isDulitabs==false"><slot></slot></view>
		<tm-sheet :transprent="props.transprent" :color="props.color" :followTheme="props.followTheme"
			:dark="props.dark" :round="props.round" :shadow="props.shadow" :outlined="props.outlined"
			:border="props.border" :borderStyle="props.borderStyle" :borderDirection="props.borderDirection"
			:text="props.text" :linear="props.linear" :linearDeep="props.linearDeep" :margin="[0, 0]" :padding="[0, 0]"
			:height="props.itemHeight + modelStyle.border + props.gutter"
			:_class="['flex-center flex-row nonvue', cstomClass]" :_style="props._style" :width="props.width">
			<!-- #ifndef APP-NVUE -->
			<scroll-view :scroll-with-animation="true" :scroll-into-view="_scrollToId" :scroll-x="true" :show-scrollbar="false" enable-flex class="tableHeader flex-row">
				<view class="flex flex-row nowrap  nonvue" :class="[_align]"
					:style="[{ width: `${props.width}rpx`, height: `${props.itemHeight}rpx` }]">
					<view :id="tabsid+item.key" v-for="(item, index) in cacheTabs"  :key="index">
						<tm-sheet @click="changeKey(item.key)"  :round="props.itemRound" :linear="props.itemLinear" :linearDeep="props.itemLinearDeep"
							borderDirection="bottom" :text="item.key == _active ? modelStyle.text : false"
							:border="item.key == _active ? modelStyle.border : 0"
							:transprent="item.key == _active ? modelStyle.transprent : true" :color="
							props.activeColor && item.key == _active ? props.activeColor : props.color
							" :width="props.itemWidth" _class="flex-center flex-row" 
							:margin="[0, 0]" :padding="[20, 0]" :height="props.itemHeight">
							<tm-icon :userInteractionEnabled="false" v-if="item.icon" _class="pr-5" 
								:color="item.key == _active ? props.activeFontColor : props.unSelectedColor"
								:font-size="item.key == _active ? props.activeFontSize : props.itemFontSize" :name="item.icon">
							</tm-icon>
							<tm-text :userInteractionEnabled="false" :font-size="item.key == _active ? props.activeFontSize : props.itemFontSize"
							:_class="item.key == _active?'text-weight-b':''"
								:color="item.key == _active ? props.activeFontColor : props.unSelectedColor"
								:label="item.title">
							</tm-text>
						</tm-sheet>
						
					</view>
					
				</view>
			</scroll-view>
			
			<!-- #endif -->
			
			<!-- #ifdef APP-NVUE -->
			
			<scroll-view :scroll-into-view="_scrollToId" :scroll-x="true" :scroll-with-animation="true" :show-scrollbar="false" enable-flex class="flex-row" :class="[_align]"
				:style="[{ width: `${props.width}rpx`, height: `${props.itemHeight}rpx` }]">
				<view :id="tabsid+item.key" v-for="(item, index) in cacheTabs"  :key="index">
					<tm-sheet  @click="changeKey(item.key)"  
						:round="props.itemRound" 
						:linear="props.itemLinear" 
						:linearDeep="props.itemLinearDeep"
						borderDirection="bottom" :text="item.key === _active ? modelStyle.text : false"
						:border="(item.key === _active ? modelStyle.border : 0)"
						:transprent="(item.key === _active ? modelStyle.transprent : true)" :color="
						(props.activeColor && item.key === _active ? props.activeColor : props.color)
						" :width="props.itemWidth" _class="flex-center flex-row"
						:margin="[0, 0]" :padding="[20, 0]" :height="props.itemHeight">
						<tm-icon :userInteractionEnabled="false" v-if="item.icon" _class="pr-5"
							:color="item.key === _active ? props.activeFontColor : props.unSelectedColor"
							:font-size="item.key === _active ? props.activeFontSize : props.itemFontSize" :name="item.icon">
						</tm-icon>
						<tm-text :userInteractionEnabled="false"  
						:font-size="item.key === _active ? props.activeFontSize : props.itemFontSize"
							:color="item.key === _active ? props.activeFontColor : props.unSelectedColor"
							:label="item.title">
						</tm-text>
					</tm-sheet>
				</view>
			</scroll-view>
			<!-- #endif -->
		</tm-sheet>
		<view v-if="_tabPos=='top'&&isDulitabs==false"><slot></slot></view>
	</view>
</template>
<script lang="ts" setup>
	/**
	 * 选项卡
	 * @description 可以单独使用，配合tm-tabs-pane可实现卡片内容切换。
	 * @example
	 * <tm-tabs :width="750" default-name="6">
			<tm-tabs-pane v-for="item in 20" :name="item" :title="'未收件'+item">
				{{item}}
			</tm-tabs-pane>
		</tm-tabs>
	 */
	import {
		computed,
		ref,
		provide,
		watch,
		toRaw,nextTick,onMounted, watchEffect, PropType
	} from "vue";
	import tmSheet from "../tm-sheet/tm-sheet.vue";
	import tmText from "../tm-text/tm-text.vue";
	import tmIcon from "../tm-icon/tm-icon.vue";
	import {
		custom_props,
		computedClass
	} from "../../tool/lib/minxs";
	//缓存已添加的项
	interface tabsobj {
		key: string | number;
		title: string;
		icon ? : string;
	}
	const emits = defineEmits(["update:activeName", "change", "click"]);
	const props = defineProps({
		...custom_props,
		//如果提供了，那么就不需要tm-tabs-pane，可以单独使用。
		list: {
			type: Array as PropType<Array<tabsobj>>,
			default: () => [],
		},
		color: {
			type: String,
			default: "white",
		},
		transprent: {
			type: [Boolean, String],
			default: false,
		},
		width: {
			type: Number,
			default: 500,
		},
		itemHeight: {
			type: Number,
			default: 80,
		},
		//不设定窗口高度，在真机上有闪烁。如果设定为0将是自动高度。
		height: {
			type: Number,
			default: 1000,
		},
		//内容在bar中的上下间隔。当有选项背景色时，底部为白色，这相当有用。
		gutter: {
			type: Number,
			default: 0,
		},
		defaultName: {
			type: [String, Number],
			default: "",
		},
		//当前活动项。v-model:active-name
		activeName: {
			type: [String, Number],
			default: "",
		},
		//标签导航的位置，
		//top导航在上方，bottom导航在下方。
		tabPos:{
			type:String,
			default:'top'
		},
		//项目的宽度。如果提供，每个标签是等宽度的，如果不提供自动宽度。
		itemWidth: {
			type: Number,
			default: 0,
		},
		//tab选中的背景颜色。默认为空
		activeColor: {
			type: String,
			default: "primary",
		},
		activeFontColor: {
			type: String,
			default: "primary",
		},
		activeFontSize: {
			type: Number,
			default: 30,
		},
		//选项卡样式模型
		itemModel: {
			type: String,
			default: "text", //line底部线条，card背景颜色模式，text文本模式,textLight背景减淡模式，文字会变灰。
		},
		//默认为空即根据主题自定颜色。如果填写了将使用该颜色为未选中色。
		unSelectedColor: {
			type: String,
			default: "",
		},
		itemFontSize: {
			type: Number,
			default: 28,
		},
		itemLinear: {
			type: String,
			default: "",
		},
		itemLinearDeep: {
			type: String,
			default: "light",
		},
		itemRound: {
			type: Number,
			default: 0,
		},
		align: {
			type: String,
			default: "left", //left:左对齐,right：右对齐,center：剧中,around：剧中均分
		},
	});
	const _align = computed(() => {
		let align_list = {
			right: "flex-row-center-end",
			left: "flex-row-center-start",
			center: "flex-row-center-center",
			around: "flex-around",
		};
		let key = "center";
		if(align_list.hasOwnProperty(String(props.align))){
			key = String(props.align)
		}
		
		return align_list[key];
	});
	const _active = ref(props.defaultName);
	emits("update:activeName",_active.value)
	const cstomClass = computed(() => computedClass(props));
	const _scrollToId = ref("")
	const modelStyle = computed(() => {
		if (props.itemModel == "text") {
			return {
				transprent: true,
				border: 0,
				text: false,
			};
		} else if (props.itemModel == "line") {
			return {
				transprent: true,
				border: 4,
				text: false,
			};
		} else if (props.itemModel == "textLight") {
			return {
				transprent: false,
				border: 4,
				text: true,
			};
		} else if (props.itemModel == "card") {
			return {
				transprent: false,
				border: 0,
				text: false,
			};
		}
		return {
			transprent: true,
			border: 0,
			text: false,
		};
	});
	const tmTabsId = "tmTabsId"
	const _tabPos = computed(()=>props.tabPos)
	const cacheTabs = ref < Array < tabsobj >> ([]);
	const isDulitabs = computed(()=>props.list.length>0)
	const tabsid = 'tabs_id_'+uni.$tm.u.getUid(1)+'_'
	watchEffect(()=>{
		cacheTabs.value = [];
		props.list.forEach((el,index)=>{
			cacheTabs.value.push({ key: el?.key??String(index), title: el?.title??String(index), icon: el?.icon??""})
		})
	})
	function pushKey(o: tabsobj) {
		let index: number = cacheTabs.value.findIndex((el) => el.key === o.key);
		if (index > -1) {
			cacheTabs.value.splice(index, 1, {
				...cacheTabs.value[0],
				...o
			});
		} else {
			cacheTabs.value.push(o);
		}

		if (_active.value == "") {
			changeKey(cacheTabs.value[0].key, false);
		}
	}

	function changeKey(key: string | number, isclick = true) {
		_active.value = key;
		emits("update:activeName", toRaw(_active.value));
		emits("change", key);
		if (isclick) {
			emits("click", key);
		}
	}

	function setTitle(o: tabsobj) {
		let index: number = cacheTabs.value.findIndex((el) => el.key == o.key);
		if (index > -1) {
			cacheTabs.value.splice(index, 1, o);
		}
	}

	function unbindKey(key: string | number) {
		let index: number = cacheTabs.value.findIndex((el) => el.key == key);
		if (index > -1) {
			cacheTabs.value.splice(index, 1);
		}
		let index2: number = cacheTabs.value.findIndex((el) => el.key == _active.value);

		if (index2 == -1 && cacheTabs.value.length > 0) {
			changeKey(cacheTabs.value[0].key, false);
		} else if (cacheTabs.value.length == 0) {
			changeKey("", false);
		}
	}
	watch(
		() => props.activeName,
		() => {
			changeKey(props.activeName, false);
		}
	);
	onMounted(()=>{
		setTimeout(()=>{
			nextTick(()=>{
				_scrollToId.value = tabsid+_active.value;
				
			})
			
		},300)
	})
	watch(()=>_active.value,()=>{

		nextTick(()=>{
			let index = cacheTabs.value.findIndex(el=>el.key == _active.value)
			if(index-1>-1){
				if(typeof cacheTabs.value[index-2] == 'undefined') return;
				_scrollToId.value = tabsid+cacheTabs.value[index-2]?.key;
			}else{
				_scrollToId.value = tabsid+_active.value;
			}
			
		})
	})
	defineExpose({
		pushKey: pushKey,
		changeKey: changeKey,
		unbindKey,
		setTitle: setTitle,
		tmTabsId
	});
	provide(
		"tabsActiveName",
		computed(() => _active.value)
	);
	provide(
		"tabsWidth",
		computed(() => props.width)
	);
	provide(
		"tabsheight",
		computed(() => {
			if (!props.height) return 0;
			return props.height - props.itemHeight - props.gutter;
		})
	);
</script>

