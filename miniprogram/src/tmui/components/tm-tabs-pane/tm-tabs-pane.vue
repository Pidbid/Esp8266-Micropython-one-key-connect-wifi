<template>
  <tm-sheet
    v-if="isShow"
    :transprent="props.transprent"
    :color="props.color"
    :followTheme="props.followTheme"
    :followDark="props.followDark"
    :dark="props.dark"
    :round="props.round"
    :shadow="props.shadow"
    :outlined="props.outlined"
    :border="props.border"
    :borderStyle="props.borderStyle"
    :borderDirection="props.borderDirection"
    :text="props.text"
    :linear="props.linear"
    :linearDeep="props.linearDeep"
    :_style="props._style"
    :_class="props._class"
    
    :margin="[0, 0]"
    :padding="[0, 0]"
  >
    <scroll-view
      :scroll-y="_height ? true : false"
      enable-flex
      class="flex-col"
      :style="[{ width: _width + 'rpx' }, _height ? { height: _height + 'rpx' } : '']"
    >
      <view>
        <slot></slot>
      </view>
    </scroll-view>
  </tm-sheet>
</template>

<script lang="ts" setup>
/**
 * 选项卡面板
 * @description 不可以单独使用，必须放置在tm-tabs组件中使用。
 */
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmTranslate from "../tm-translate/tm-translate.vue";
import {
  computed,
  watch,
  onUnmounted,
  inject,
  ComputedRef,
  getCurrentInstance,
} from "vue";
import { custom_props } from "../../tool/lib/minxs";
const { proxy } = getCurrentInstance();
const props = defineProps({
  ...custom_props,
  transprent: {
    type: [Boolean, String],
    default: false,
  },
  color: {
    type: String,
    default: "white",
  },
  name: {
    type: [String, Number],
    default: "",
    required: true,
    validator: (value: any) => {
      let isok = false;
      if ((typeof value == "number" || typeof value == "string") && value != "") {
        isok = true;
      }
      if (!isok) {
        console.error("name是tabs唯一标识符,不允许为空，且必须为数字或者字符串。");
      }
      return isok;
    },
  },
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});
//父级方法。
let parent = proxy.$parent
while (parent) {
    if(parent?.tmTabsId=='tmTabsId'||!parent){
        break;
    }else{
        parent = parent?.$parent??undefined
    }
}
const _pname = computed(()=>String(props.name))
if (typeof  _pname.value != "undefined" &&  _pname.value != "") {
  parent.pushKey({ key: _pname.value, title: props.title, icon: props.icon });
}
const _width = inject(
  "tabsWidth",
  computed(() => 0)
);
const _height = inject(
  "tabsheight",
  computed(() => 0)
);
const tabsActiveName: ComputedRef<string | number | undefined> = inject(
  "tabsActiveName",
  computed(() => undefined)
);
const isShow = computed<boolean>(() => {
  if (tabsActiveName == undefined) return false;
  if (tabsActiveName.value ==  _pname.value) return true;
  return false;
});

watch([() => props.title, () => props.icon], () => {
  parent.setTitle({ key:  _pname.value, title: props.title, icon: props.icon });
});
onUnmounted(() => {
  parent.unbindKey( _pname.value);
});
</script>

<style></style>
