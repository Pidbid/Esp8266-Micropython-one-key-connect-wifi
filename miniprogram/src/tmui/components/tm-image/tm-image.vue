<template>

	<tm-translate :width="img_width+props.unit" v-if="!isRmove" @end="aniEnd" ref="aniplay" :autoPlay="false" name="zoom"
		reverse>
		<tm-sheet :color="props.color" :transprent="props.transprent" :margin="props.margin" :round="props.round"
			:border="props.border" :padding="[props.padding[0],0]" :class="['round-' + props.round]" :width="img_width"
			:unit="props.unit">
			<view :class="[`pb-${props.padding[1]}`]">
				<image v-if="loading" :src="props.src" style="width: 10px;height: 10px;opacity: 0;transform:translateX(120000px)" @load="imageLoad"
					@error="imageError" mode="scaleToFill"></image>
				<image @click="imageClick" :class="['round-' + props.round]" v-if="!loading && !error" :src="props.src"
					:style="[{ width: img_width + props.unit, height: img_height + props.unit }]" :mode="props.model"></image>
				<view v-if="loading && !error" :style="[{ width: img_width + props.unit, height: img_height + props.unit }]"
					class="flex flex-center opacity-3">
					<tm-icon spin name="tmicon-loading"></tm-icon>
				</view>
				<view v-if="!loading && error" :style="[{ width: img_width + props.unit, height: img_height + props.unit }]"
					class="flex flex-col flex-center opacity-5">
					<tm-icon name="tmicon-exclamation-circle"></tm-icon>
					<tm-text _class="pt-10" :font-size="26" :label="props.errorLabel"></tm-text>
				</view>
				<!-- extra -->
				<view @click.stop="imageClick" v-if="props.extra" :class="[
					props.extraPosition == 'in' ? 'absolute l-0 b-0 zIndex-5' : '',
					'flex flex-col flex-col-bottom-start'
				]" :style="[
					props.extra && props.extraPosition == 'in' ? { height: img_height + props.unit, width: img_width + props.unit } : '',
					props.extra && props.extraPosition == 'out' ? { width: img_width + props.unit } : '',
				]">
					<slot name="extra"></slot>
				</view>
				<!-- delete 展示删除按钮。 -->
				<view v-if="props.delete" class="absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10"
					:style="[props.delete ? { width: img_width + props.unit } : '',]">
					<tm-icon @click="del" color="red" name="tmicon-times-circle-fill"></tm-icon>
				</view>
			</view>
		</tm-sheet>
	</tm-translate>
</template>

<script lang="ts" setup>
/**
 * 图片
 * @description 可以搭配图片组tm-image-group使用,形成一个图片相册展示。提供了预览，删除，增强内容显示。
 * @template extra图片展示的额外内容。
 */
import {
	getCurrentInstance,
	computed,
	ref,
	inject
} from 'vue'
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmText from "..//tm-text/tm-text.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmTranslate from "../tm-translate/tm-translate.vue";
import {
	custom_props,
} from '../../tool/lib/minxs';
const {
	proxy
} = getCurrentInstance();
const emits = defineEmits(['load', 'error', 'click', 'delete'])
const props = defineProps({
	...custom_props,
	//外部间隙
	margin: {
		type: Array,
		default: () => [0, 0]
	},
	//内部间隙
	padding: {
		type: Array,
		default: () => [0, 0]
	},
	color: {
		type: String,
		default: 'white'
	},
	transprent: {
		type: [Boolean, String],
		default: true
	},
	border: {
		type: Number,
		default: 0
	},
	width: {
		type: [Number, String],
		default: 200,
		required: true
	},
	height: {
		type: [Number, String],
		default: 200,
		required: true
	},
	src: {
		type: String,
		default: "",
		required: true
	},
	errorIcon: {
		type: String,
		default: ''
	},
	errorLabel: {
		type: String,
		default: '加载错误'
	},
	loadIcon: {
		type: String,
		default: ''
	},
	//是否开启预览。
	preview: {
		type: [Boolean, String],
		default: false
	},
	//是否开启图片额外插槽显示内容。
	extra: {
		type: [Boolean, String],
		default: false
	},
	extraPosition: {
		type: String,
		default: 'in', //in:叠加图片上显示,out：图片下方显示,
	},
	//展示关闭删除按钮。
	delete: {
		type: [Boolean, String],
		default: false
	},
	//是否允许点击delete图标关闭自己，如果为false,将仅触发delete事件，本身图片不会被关闭。
	allowDelete: {
		type: [Boolean, String],
		default: true
	},
	//图片绽放模式。
	//同官方阅读：https://uniapp.dcloud.io/component/image.html
	model: {
		type: String,
		default: 'scaleToFill'
	},
	unit: {
		type: String,
		default: 'rpx'
	}
})
if (!props.height && !props.width) {
	console.error("错误：图片宽度和高度必须设置一个");
}
const img_width = computed(()=>{
	return props.width
})
const img_height = computed(()=>{
	return props.height - props.padding[1]
})

const loading = ref(true);
const error = ref(false)
const isRmove = ref(false)

//父级方法。
let parent = proxy.$parent

while (parent) {
    if(parent?.tmImageGroup=='tmImageGroup'||!parent){
        break;
    }else{
        parent = parent?.$parent??undefined
    }
}

const ImagGrupList = inject('ImagGrupList', computed(()=>[]))
//向父级报送当前图片地址
if (parent?.pushKey) {
	parent.pushKey({
		width: img_width.value,
		height: img_width.value,
		src: props.src
	})
}

function imageLoad(event:Event) {
	loading.value = false;
	emits('load', event)
}

function imageError(event:Event) {
	console.error("图片加载错:"+props.src)
	error.value = true;
	loading.value = false;
	emits('error', event)
}

function imageClick(event:Event) {
	emits('click', event)
	if (props.preview) {
		let list = ImagGrupList ? ImagGrupList.value : [props.src];
		uni.previewImage({
			urls: list,
			current: props.src
		})
	}
}

async function del() {
	isRmove.value = false;
	if (!props.allowDelete) {
		emits('delete', props.src);
		return;
	}
	if (proxy.$refs?.aniplay) {
		proxy.$refs.aniplay.play();
	} else {

		isRmove.value = true;
	}
}

function aniEnd() {
	isRmove.value = true;
}
</script>

<style>
</style>
