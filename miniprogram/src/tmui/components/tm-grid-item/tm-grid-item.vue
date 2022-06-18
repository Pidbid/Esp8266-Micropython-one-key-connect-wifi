<template>
  <tm-sheet hover-class="opacity-6" :transprent="true" :height="props.height" :width="_colWidth - 0.5" :margin="[0, 0]"
    :padding="[0, 0]" _class="flex-col flex" @click="onClick">
    <view class="flex-1 flex flex-col-center-center">
      <tm-badge :userInteractionEnabled="true" :fontSize="20" :dot="props.dot" :count="props.count" :max-count="props.maxCount"
        :icon="props.icon" :color="props.color">
        <view class="flex-col flex-col-center-center flex px-10">
          <slot></slot>
        </view>
      </tm-badge>
    </view>
  </tm-sheet>
</template>
<script lang="ts" setup>
/**
 * 九宫格子项目
 * @description 注意，它只能放置在tm-grid中，且不能嵌套tmg-grid
 * @slot 默认插槽 任意内容
 */
import { computed, inject, provide, ref } from "vue";
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmBadge from "../tm-badge/tm-badge.vue";
const emits = defineEmits(["click"]);
const props = defineProps({
  //项目的高度。如果提供为0，就表示自动高度。
  height: {
    type: Number,
    default: 100,
  },
  dot: {
    type: [Boolean, String],
    default: false,
  },
  icon: {
    type: [Boolean, String],
    default: false,
  },
  //如果count为数字时，显示数字角标，如果为string是显示文本角标。
  count: {
    type: [Number, String],
    default: 0,
  },
  maxCount: {
    type: [Number, String],
    default: 999,
  },
  color: {
    type: String,
    default: "red",
  },
  //如果提供了链接，当点击项目时自动跳转页面。
  url: {
    type: String,
    default: ""
  }
});
const _colWidth = inject(
  "tmGridItemWidth",
  computed(() => 0)
);
function onClick(e:Event) {
  emits('click', e)
  if (props.url !== '') {
    try{
      uni.navigateTo({
        url: props.url
      })
    }catch(e){
      //TODO handle the exception
    }
  }
}
</script>
