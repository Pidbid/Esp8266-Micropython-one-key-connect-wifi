<template>
	<tm-translate v-if="showBody" @end="hide" ref="bodyani" :reverse="reani" :name="hidnAniName" :autoPlay="false">
		<tm-sheet :height="props.height" :color="props.color" :_class="_class" :_style="_style" :followTheme="props.followTheme"
			:dark="props.dark" :round="props.round" :shadow="props.shadow" :outlined="props.outlined"
			:border="props.border" :borderStyle="props.borderStyle" :borderDirection="props.borderDirection"
			:text="props.text" :transprent="props.transprent" :linear="props.linear" :linearDeep="props.linearDeep"
			:margin="props.margin" :padding="props.padding">
			
			<view class=" relative bdcld flex flex-row flex-row-top-start">
				<view style="width: 0px;" class="flex flex-12 flex-row flex-row-top-start"
					:class="[closable?'pr-24 ':'']">
					<view v-for="(item,index) in list" :key="index" :class="[activeIndex==index?'flex-12 ':' flex-0 ']"
						class="flex  flex-row flex-row-top-start anifun">
						<tm-translate  name="zoom" style="width:100%"  _class="flex-12 flex flex-row flex-row-top-start" v-if="activeIndex==index">
							<view class="flex-12 flex flex-row flex-row-top-start">
								<view v-if="item['icon']" class="pr-32">
									<tm-icon :fontSize="32" :name="item['icon']"></tm-icon>
								</view>
								<view style="width: 0px;" class="flex-12 flex flex-col">
									<view v-if="item['title']" class="pb-12">
										<tm-text @click="emits('click',$event)"
											_class="text-size-m  text-overflow-1 text-weight-b" :fontSize="30"
											:label="item['title']"></tm-text>
									</view>
							
									<view v-if="item['content']" class="flex-12">
										<tm-text @click="emits('click',$event)" :fontSize="26" :_class="'text-overflow-'+props.maxLine"
											:_style="{lineHeight:'34rpx'}" :label="item['content']"></tm-text>
										<tm-text v-if="len>1" _class="pt-24" :label="`${activeIndex+1}/${len}`"></tm-text>
									</view>
								</view>
							</view>
						</tm-translate>
					</view>
				</view>
				<view v-if="closable" class="flex flex-row flex-row-top-end">
					<tm-icon @click="close" :fontSize="32" name="tmicon-times-circle-fill"></tm-icon>
				</view>
			</view>
		</tm-sheet>
	</tm-translate>
</template>

<script lang="ts" setup>
	/**
	 * 警告提示
	 * @description 警告提示，属于静态页面中的消息提醒，主要用于页面提示性的说明，警醒用户。
	 */

	import tmSheet from "../tm-sheet/tm-sheet.vue";
	import tmText from "../tm-text/tm-text.vue";
	import tmIcon from "../tm-icon/tm-icon.vue";
	import tmTranslate from "../tm-translate/tm-translate.vue";
	import { itemType } from "./interface";
	import {
		custom_props,
	} from '../../tool/lib/minxs';
	import {
		getCurrentInstance,
		computed,
		ref,
		onMounted,
		onUnmounted,
		PropType
	} from 'vue';
	const emits = defineEmits(['click'])
	const {
		proxy
	} = getCurrentInstance();
	const props = defineProps({
		...custom_props,
		transprent: {
			type: [Boolean, String],
			default: false
		},
		border: {
			type: [Number, String],
			default: 0
		},
		round: {
			type: [Number, String],
			default: 2
		},
		margin: {
			type: Array,
			default: () => [32, 24]
		},
		padding: {
			type: Array,
			default: () => [24, 24]
		},
		content: {
			type: Array as PropType<Array<itemType>>,
			default: () => [],
		},
		autoPlay: {
			type: Boolean,
			default: true
		},
		//关闭窗体的动画
		hidnAniName: {
			type: String,
			default: "zoom"
		},
		//轮播间隙
		duration: {
			type: Number,
			default: 3000
		},
		closable: {
			type: [Boolean, String],
			default: true
		},
		//高度必填。
		height:{
			type:[Number],
			default:160,
		},
		//内容最大显示几行，变成省略号
		maxLine:{
			type:[Number],
			default:1,
		}
	})
	const activeIndex = ref(0)
	const showBody = ref(true)

	let timeid = uni.$tm.u.getUid(5)
	const reani = computed(() => props.hidnAniName == 'zoom' || props.hidnAniName == 'fade' ? true : false)
	const list = computed(() => {
		let c = props.content.map(el => {
			el['content'] = el?.content ?? "";
			el['title'] = el?.title ?? "";
			el['icon'] = el?.icon ?? "";
			return el;
		})
		return c;
	})
	const len = computed(() => list.value.length)
	onUnmounted(() => clearTimeout(timeid))
	onMounted(() => {
		if (props.autoPlay) {
			play()
		}
	})

	function hide() {
		clearTimeout(timeid);
		showBody.value = false;
	}

	function play() {
		if (len.value < 1) return;
		clearTimeout(timeid);
		timeid = setTimeout(function() {
			next()
		}, props.duration)
	}

	function next() {
		clearTimeout(timeid);
		let index = activeIndex.value + 1;
		if (index == len.value) {
			index = 0;
		}
		activeIndex.value = index;
		play()
	}

	function close() {
		proxy.$refs?.bodyani.play();
	}
</script>

