<template>
	<view class="flex flex-col " :class="[disabled ? 'opacity-7' : '']">
		<tm-sheet @click="openAndClose"  :color="props.color" :text="disabled" :border="cborder" :linear="props.linear"
			:linearDeep="props.linearDeep" :followTheme="props.followTheme" :dark="props.dark"
			:followDark="props.followDark" borderDirection="bottom" :margin="props.margin" :padding="props.padding"
			:height="88">
			<view :userInteractionEnabledn="false" class="flex-row-center-start flex-row ">
				<slot name="icon" :data="{ isActive: isActive }">
					<tm-icon :dark="props.dark" :followTheme="props.followTheme" :followDark="props.followDark"
						 :color="isActive ? props.activeColor : ''"
						:name="isActive ? 'tmicon-sort-down' : 'tmicon-caret-right'" :font-size="24" _class="pr-16"
						_style="line-height:88rpx;"></tm-icon>
				</slot>
				<view class="flex flex-row flex-12" style="width:0px">
					<slot name="title" :data="{ isActive: isActive }">
						<tm-text  :dark="props.dark" :followTheme="props.followTheme" :followDark="props.followDark"
							:fontSize="30" :color="isActive ? props.activeColor : ''"
							_style="line-height:88rpx;" :label="props.title"></tm-text>
					</slot>
				</view>
			</view>
		</tm-sheet>
		<tm-translate :duration="350" v-if="isActive">
			<view class="px-24 pt-24 pb-24">
				<slot></slot>
			</view>
		</tm-translate>
	</view>
</template>

<script lang="ts" setup>
/**
 * 折叠面板 tm-collapse
 * @description 有手风琴模式。请注意它里面只能旋转tm-collapse-item子组件，其它组件会失效。
 */
import {
	getCurrentInstance,
	computed,
	ref,
	inject,
} from 'vue';
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmText from "../tm-text/tm-text.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmTranslate from "../tm-translate/tm-translate.vue";
import {
	custom_props,
} from '../../tool/lib/minxs';
const { proxy } = getCurrentInstance();
const emits = defineEmits(['click'])
const props = defineProps({
	...custom_props,
	color: {
		type: String,
		default: 'white'
	},
	title: {
		type: String,
		default: ''
	},
	//标识，用来展开和关闭的标识。
	name: {
		type: [Number, String],
		default: ''
	},
	activeColor: {
		type: [String],
		default: 'primary'
	},
	margin: {
		type: Array,
		default: () => [0, 0],
	},
	padding: {
		type: Array,
		default: () => [32, 0],
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
})
const _activekeyArray = inject("tmCollapseKeyList", computed(()=>[]))
//父级方法。
let parent = proxy.$parent

while (parent) {
    if(parent?.tmCollapse=='tmCollapse'||!parent){
        break;
    }else{
        parent = parent?.$parent??undefined
    }
}
if(parent){
	//向父级缓存本子组件的key值。
	parent.pushKey(props.name)
}


const cborder = ref(props.border ? props.border : parent.border);


const isActive = computed(() => {
	let index = _activekeyArray.value.findIndex(el => {
		return el == props.name;
	})
	return index > -1;
})

function openAndClose(e) {
	emits("click", e)
	if (props.disabled) return;
	parent.setKey(props.name)
}
</script>

<style>
</style>
