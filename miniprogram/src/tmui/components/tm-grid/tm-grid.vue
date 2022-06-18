<template>
  <tm-sheet
    :transprent="props.transprent"
    :color="props.color"
    :margin="[0, 0]"
    :padding="[0, 0]"
    _class="flex flex-row flex-row-top-start"
    contStyle="flex-wrap:wrap;"
  >
    <slot></slot>
  </tm-sheet>
</template>
<script lang="ts" setup>
/**
 * 宫格
 * @description 注意，它内部只能放置tm-grid-item，且不能嵌套tmg-grid
 * @slot 默认插槽 放置tm-grid-item
 * @example 例子：
    <tm-grid >
        <tm-grid-item v-for="(item,index) in 11" :key="index">
            <tm-icon  :fontSize="64" name="https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png"></tm-icon>
            <tm-text :fontSize="22" label="苹果"></tm-text>
        </tm-grid-item>
    </tm-grid>
 */
import { computed, provide, ref } from "vue";
import { custom_props } from "../../tool/lib/minxs";
import tmSheet from "../tm-sheet/tm-sheet.vue";
const props = defineProps({
  ...custom_props,
  width: {
    type: Number,
    default: 750,
  },
  //一行放置几个。
  col: {
    type: Number,
    default: 5,
  },
  //是否显示边线。
  showBorder: {
    type: Boolean,
    default: false,
  },
  // 背景
  color: {
    type: String,
    default: "white",
  },
  //是否透明背景
  transprent: {
    type: Boolean,
    default: false,
  },
});

const _colWidth = computed(() => props.width / props.col);
provide("tmGridItemWidth", _colWidth);
</script>
