<template>
	<view class="flex-col flex">
		<slot></slot>
	</view>
</template>

<script lang="ts" setup>
	import {
		getCurrentInstance,
		computed,
		ref,
		provide,
		inject,
		onMounted,
		onUnmounted,
		nextTick,
		watch,
		reactive,
		Ref
	} from 'vue';
	import tmSheet from "../tm-sheet/tm-sheet.vue";
	const emits = defineEmits(['change','update:active-key'])
	const props = defineProps({
		//当前展开并激活的面板。
		activeKey: {
			type: [Array],
			default: () => []
		},
		//默认展开的面板
		defaultActiveKey: {
			type: [Array],
			default: () => []
		},
		//是否设置为单个面板展开，默认fase，允许 多个面板同时展开。
		accordion:{
			type:[Boolean,String],
			default:false,
		},
		border:{
			type:[Number,String],
			default:2,
		}
	})
	
	const _activeKey = ref([...props.activeKey,...props.defaultActiveKey]);
	if(props.accordion){
		if(_activeKey.value.length>0){
			_activeKey.value = [_activeKey.value[0]]
		}
	}
	const cacheKey:Ref<Array<string|number>> = ref([]);
	const pushKey = function(key:string|number){
		cacheKey.value = [...new Set([...cacheKey.value,key])]
	}
	const setKey = function(key:string|number){
		let findkey = _activeKey.value.findIndex(el=>String(el)==String(key));
		if(props.accordion){
			
			if(findkey >-1) {
				_activeKey.value = []
			}else{
				_activeKey.value = [key]
			}
		}else{
			if(findkey >-1) {
				_activeKey.value.splice(findkey,1);
			}else{
				_activeKey.value.push(key);
			}
		}
		
		emits("update:active-key",_activeKey.value)
		emits("change",_activeKey.value)
	}
	emits("update:active-key",_activeKey.value)
	defineExpose({tmCollapse:"tmCollapse",setKey:setKey,pushKey:pushKey,border:props.border})
	provide("tmCollapseKeyList",computed(()=>_activeKey.value))
</script>

<style>

</style>
