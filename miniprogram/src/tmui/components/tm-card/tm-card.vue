<template>
	<tm-sheet
	:color="props.color"
	:_class="[customClass,'flex-col']"
	:_style="[customCSSStyle,]"
	:followTheme="props.followTheme"
	:dark="props.dark"
	:round="props.round"
	:shadow="props.shadow"
	:outlined="props.outlined"
	:border="props.border"
	:borderStyle="props.borderStyle"
	:borderDirection="props.borderDirection"
	:text="props.text"
	:transprent="props.transprent"
	:linear="props.linear"
	:linearDeep="props.linearDeep"
	:width="props.width"
	:height="props.height"
	:margin="props.margin"
	:padding="props.padding"
	>
	<view class="flex-row flex-between pt-24">
		<slot name="title"><tm-text :font-size="28" _class="text-weight-b" :label="props.title"></tm-text></slot>
		<slot name="status"><tm-text :followTheme="false" :color="props.statusColor" :font-size="26" :label="props.status"></tm-text></slot>
	</view>
	<tm-divider></tm-divider>
	<view class="pb-24">
		<slot name="content"><tm-text :font-size="26" _class="wrap" :label="props.content"></tm-text></slot>
	</view>
	<view class="flex pb-24">
		<slot name="action"></slot>
	</view>
	</tm-sheet>
</template>

<script lang="ts" setup>
	/**
	 * 卡片
	 */
	import { computed} from 'vue';
	import { custom_props, computedClass, computedStyle} from '../../tool/lib/minxs';
	import tmSheet from "../tm-sheet/tm-sheet.vue";
	import tmText from "../tm-text/tm-text.vue";
	import tmDivider from "../tm-divider/tm-divider.vue";
	const props = defineProps({
		...custom_props,
		shadow:{
			type: [Number, String],
			default: 2
		},
		round: {
			type: [Number, String],
			default: 4
		},
		border: {
			type: [Number],
			default: 0
		},
		margin: {
		  type: Array,
		  default: () => [32,16],
		},
		padding: {
		  type: Array,
		  default: () => [16, 0],
		},
		transprent: {
			type: [Boolean, String],
			default: false
		},
		color: {
			type: String,
			default: 'white'
		},
		width: {
			type: [Number],
			default: 0
		},
		height: {
			type: [Number],
			default: 0
		},
		title: {
			type: [String],
			default: ""
		},
		status: {
			type: [String],
			default: ""
		},
		statusColor:{
			type: [String],
			default: "primary"
		},
		content: {
			type: [String],
			default: ""
		},
	})
	//自定义样式：
	const customCSSStyle = computed(()=>computedStyle(props));
	//自定类
	const customClass = computed(()=>computedClass(props));
</script>
<style>

</style>
