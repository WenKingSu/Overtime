<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useAnimateSettingStore} from "~/store/animateSettingStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

const displaySettingStore = useDisplaySettingStore()
const {
  bgColor,
  clockFont,
  clockFontSize,
  remainingTimeColor,
  clockBorderColor,
  clockBorderSize
} = storeToRefs(displaySettingStore)
const animateSettingStore = useAnimateSettingStore()
const {animateTime, animateMoveRange} = storeToRefs(animateSettingStore)
const clockSettingStore = useClockSettingStore()
const {addTimeQueue} = storeToRefs(clockSettingStore)

const elements = ref([]);
const itemRefs = ref([]);

const addElement = (value) => {
  const id = Date.now(); // 使用當前時間戳作為唯一ID
  elements.value.push({id, text: value});

  // 動態獲取最近添加的元素
  const newElementIndex = elements.value.length - 1;

  // 確保 itemRefs 參考最新的 DOM 元素
  nextTick(() => {
    const element = itemRefs.value[newElementIndex];
    if (element) {
      // 在這裡你可以使用 useAnimate 進行動畫
      const animate = useAnimate(
          element,
          [
            {opacity: 1, transform: 'translateY(0px)'}, // 出现时的最终状态
            {opacity: 0, transform: `translateY(-${animateMoveRange.value}px)`}, // 初始状态
          ],
          {
            duration: animateTime.value * 1000, // 动画持续时间
            fill: 'forwards', // 保持最终状态
          },
      )
      animate.play()
      setTimeout(() => {
        itemRefs.value.shift()
        elements.value.shift()
        element.remove()
      }, animateTime.value * 2000)
    }
  });
};

watch(addTimeQueue.value, () => {
  if (addTimeQueue.value.length > 0) {
    addElement(addTimeQueue.value.shift())
  }
})

</script>

<template>
  <div
      id="Monitor-Overview-Animate"
      class="w-full h-full flex-y-center justify-center gap-3"
      :style="{backgroundColor: `#${bgColor}`}"
  >
    <div
        v-for="item in elements"
        :key="item.id"
        class="absolute"
        ref="itemRefs"
        :style="{
      fontSize: `${clockFontSize}px`,
      color: `#${remainingTimeColor}`,
      fontFamily: `${clockFont}`,
      'text-shadow': `-${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, -${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}`
    }"
    >
      + {{ item.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Overview-Animate {
}
</style>
