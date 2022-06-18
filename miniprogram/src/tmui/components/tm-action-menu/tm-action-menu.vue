<!--
 * @Date: 2022-05-07 13:31:20
 * @LastEditors: tmzdy
 * @Author: tmzdy
 * @Description: 文件
-->
<template>
	<tm-drawer
		ref="drawer"
		@close="drawerClose"
		@open="drawerOpen"
		:height="cHeight"
		@update:show="show = $event"
		:show="show"

		:transprent="true"
		:hide-header="true"
	>
		<view>
			<view style="height: 24rpx;"></view>
			<tm-button
				:disabled="item.disabled"
				@click="change(item)"
				v-for="(item, index) in _list"
				:key="index"
				:label="item.text"
				:font-size="28"
				:margin="[32, 1]"
				color="white"
				block
				:shadow="0"
			></tm-button>
			<tm-button
				@click="cancel"
				label="取消"
				:font-size="28"
				:margin="[32, 8]"
				:color="_color"
				block
				:shadow="0"
			></tm-button>
		</view>
	</tm-drawer>
</template>

<script lang="ts" setup>
/**
 * 快速操作栏
 * @description 从底部弹出的快速操作菜单栏，对于单项可选项目操作，非常有用，且便利。
 */
import { ref, PropType, computed, getCurrentInstance, watch, watchEffect } from "vue"
import tmDrawer from '../tm-drawer/tm-drawer.vue';
import tmButton from "../tm-button/tm-button.vue";
/**
 * 事件说明
 * v-model:显示和隐藏
 * change:当点击项目时触发，返回listitem数据
 * cancel:点击取消时触发
 */
const emits = defineEmits(["update:modelValue", "change", "cancel"])
interface listitem {
	text?: string,
	disabled?: boolean,
	[prop: string]: any;
}
const { proxy } = getCurrentInstance();
const props = defineProps({
	list: {
		type: Array as PropType<Array<listitem> | Array<string>>,
		default: () => [],
		required: true
	},
	//当list为对象数组时，需要提供。
	rangKey: {
		type: String,
		default: 'text'
	},
	modelValue: {
		type: Boolean,
		default: false
	},
	color:{
		type:String,
		default:"white"
	}
})
const show = ref(props?.modelValue ?? false);
const _list = computed<Array<listitem>>(() => {
	let plist = props?.list ?? [];
	let listdata: Array<listitem> = [];
	listdata = plist.map(el => {
		let d: listitem = {};
		if (typeof el == 'string' || typeof el == 'number') {
			d.text = el;
			d.disabled = false;
		} else if (typeof el == 'object') {
			d.text = el[props.rangKey];
			d = { ...d, ...el };
		}
		return d;
	})
	return listdata
})
const cHeight = computed(() => {
	let len = _list.value.length + 1
	return len * 76 + len * 2 + 180
})
const _color = computed(()=>props.color)

watchEffect(()=>show.value = props.modelValue)
function change(item: listitem) {
	emits("change", item)
	proxy.$refs.drawer.close()
}
function cancel() {
	emits("cancel")
	proxy.$refs.drawer.close()
}
function drawerClose() {
	emits("update:modelValue", false)
}
function drawerOpen() {
	emits("update:modelValue", true)
}

</script>

<style>
</style>
