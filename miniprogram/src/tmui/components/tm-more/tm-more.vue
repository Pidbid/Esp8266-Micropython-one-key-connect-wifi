<template>
    <view class="flex flex-col">
        <view class="flex-1 flex flex-col relative contentbody overflow" ref="contentbody" :style="[
            isMaxheight && !isOpen ? { height: props.height + 'rpx' } : '',
            !isInit ? { transform: 'translateX(-1000px)' } : { transform: 'translateX(0px)' }
        ]">
            <slot></slot>
        </view>
        <view @click.stop="open" v-if="isMaxheight" class="flex zIndex-10 flex-row flex-row-bottom-center py-24" :class="[
            !css_is_nvue && !isOpen ? 'fulled-height' : '',
            isOpen ? '' : (isDark ? 'darkBg absolute' : 'lightBg absolute')
        ]" :style="[
    !css_is_nvue ? { width: '100%' } : '',
    css_is_nvue && !isOpen ? { width: (css_nvue_size[0]) + 'px', height: (css_nvue_size[1]) + 'px' } : '',
]">
            <slot name="more">
                <tm-icon :userInteractionEnabled="false" :font-size="24" :color="fontColor"
                    :name="isOpen ? 'tmicon-angle-up' : 'tmicon-angle-down'"></tm-icon>
                <tm-text :userInteractionEnabled="false" :font-size="24" :color="fontColor" _class="px-16"
                    :label="isOpen ? props.openLabel : props.closeLabel"></tm-text>
            </slot>
        </view>
    </view>
</template>
<script lang="ts" setup>
/**
 * 显示更多
 * @description 超过指定高度，默认隐藏更多内容。
 * @slot more 底部展开和收起更多的工具条的插槽。
 */
import { getCurrentInstance, computed, ref, provide, inject, onMounted, onUnmounted, onUpdated, nextTick, watch } from 'vue';
import tmIcon from '../tm-icon/tm-icon.vue';
import tmText from '../tm-text/tm-text.vue';
import { custom_props, computedTheme, computedClass, computedStyle, computedDark } from '../../tool/lib/minxs';
import { useTmpiniaStore } from '../../tool/lib/tmpinia';
const store = useTmpiniaStore();
// #ifdef APP-PLUS-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
/**
 * 事件说明
 * change:打开和隐藏时触发，返回当前打开的状态值。
 */
const emits = defineEmits(["change"])
const props = defineProps({
    ...custom_props,
    //超过指定高时隐藏并显示更多。
    height: {
        type: Number,
        default: 250
    },
    openLabel: {
        type: String,
        default: '收起更多'
    },
    closeLabel: {
        type: String,
        default: '展开更多'
    },
    //在点击打开之前执行。如果返回false，将阻止查看内容。也要吧返回Promise
    beforeOpen: {
        type: [Function, Boolean],
        default: () => false
    }
})
// 设置响应式全局组件库配置表。
const tmcfg = computed<tmVuetify>(() => store.tmStore);
//是否暗黑模式。
const isDark = computed(() => computedDark(props, tmcfg.value));
const isInit = ref(false)
const { proxy } = getCurrentInstance();

const css_is_nvue = ref(true);
// #ifndef APP-NVUE
css_is_nvue.value = false;
// #endif
const css_nvue_size = ref([0, 0])
const isOpen = ref(false);
const fontColor = computed(() => {
    if (isDark.value && !isOpen.value) return 'white';
    if (isDark.value && isOpen.value) return 'grey';
    return 'black';
})
//是否超过了指定高度。
const isMaxheight = ref(false);
const maxHeight = computed(() => uni.upx2px(props.height))
async function open() {
    if (typeof props.beforeOpen === 'function') {
        let p = await props.beforeOpen();
        if (typeof p === 'function') {
            p = await p();
        }
        if (!p) return;
    }
    isOpen.value = !isOpen.value;
    emits("change", isOpen.value)
}
onUpdated(() => {
    nvuegetClientRect();
})
onMounted(() => {
    nvuegetClientRect();
})
function nvuegetClientRect() {
    nextTick(function () {
        // #ifdef APP-PLUS-NVUE
        dom.getComponentRect(proxy.$refs.contentbody, function (res) {
            if (res?.size) {
                css_nvue_size.value = [res.size.width, res.size.height];
                if (res.size.height >= maxHeight.value) {
                    isMaxheight.value = true;
                }
                if (res.size.height == 0) {
                    nvuegetClientRect()
                } else {
                    isInit.value = true
                }
            }
        })
        // #endif
        // #ifndef APP-PLUS-NVUE
        uni.createSelectorQuery().in(proxy).select('.contentbody').boundingClientRect(res => {
            if (res.height >= maxHeight.value) {
                isMaxheight.value = true;
                if (res.height == 0) {
                    nvuegetClientRect()
                } else {
                    isInit.value = true
                }
            }
        }).exec();
        // #endif
    })

}
</script>
<style scoped>
.lightBg {
    background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.7) 50%);
}

.darkBg {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
