<template>
    <view ref="dombg">
        <tm-sheet :text="false" :userInteractionEnabled="false" :width="6" :color="props.color" :height="_size / 2"
        :margin="[0, 0]" :padding="[0, 0]">
        </tm-sheet>
    </view>
</template>
<script lang="ts" setup>
import { computed,onMounted,onUnmounted,getCurrentInstance,nextTick, } from 'vue';
// #ifdef APP-PLUS-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
const {proxy} = getCurrentInstance();
const props = defineProps({
    color: {
        type: String,
        default: "primary"
    },
    size: {
        type: Number,
        default: 50
    },
})
const _size = computed(() => props.size)
let bindxToken = null;
let  timid = 636666
onMounted(() => {
    
	// #ifdef APP-PLUS-NVUE
	// nextTick(()=>spinNvueAni())
	// #endif
})


function spinNvueAni(ot=0) {
	if (!proxy?.$refs['dombg']) return;
    let el = proxy.$refs['dombg'];
	  animation.transition(el, {
		  styles: {
			  opacity: ot,
		  },
		  duration: 800, //ms
		  timingFunction: 'ease',
		  delay: 0 //ms
	  },()=>{
		  if(ot===0){
			  ot = 1
		  }else{
			  ot=0
		  }
		  nextTick(()=>spinNvueAni(ot))
	  })
    
}
</script>
