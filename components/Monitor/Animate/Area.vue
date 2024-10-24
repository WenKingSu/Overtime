<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import type {MaybeElement} from "@vueuse/core";
import {useAnimateSettingStore} from "~/store/animateSettingStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

const displaySettingStore = useDisplaySettingStore()
const {bgColor, clockFont, clockFontSize, remainingTimeColor} = storeToRefs(displaySettingStore)
const animateSettingStore = useAnimateSettingStore()
const {animateTime, animateMoveRange} = storeToRefs(animateSettingStore)
const clockSettingStore = useClockSettingStore()
const {addTimeQueue} = storeToRefs(clockSettingStore)

const addTime = ref(null)

const el = shallowRef<MaybeElement>()
const {
  play,
  playState
} = useAnimate(
    el,
    [
      {opacity: 0, transform: `translateY(${animateMoveRange.value / 2}px)`}, // 初始状态
      {opacity: 1, transform: 'translateY(0px)'}, // 出现时的最终状态
      {opacity: 0, transform: `translateY(-${animateMoveRange.value / 2}px)`}, // 初始状态
    ],
    {
      duration: animateTime.value * 1000, // 动画持续时间
      fill: 'forwards', // 保持最终状态
    },
)

onMounted(() => {
  setInterval(() => {
    if (addTimeQueue.value.length > 0 && playState.value === 'finished') {
      addTime.value = addTimeQueue.value.pop()
      clockSettingStore.plusMinutes(addTime.value)
      play()
    }
  }, 1000)
})
</script>

<template>
  <div
      id="Monitor-Overview-Animate"
      class="w-full h-full flex-y-center justify-center gap-3"
      :style="{backgroundColor: `#${bgColor}`}"
  >
    <div
        ref="el"
        :style="{fontSize: `${clockFontSize}px`, color: `#${remainingTimeColor}`, fontFamily: `${clockFont}`}"
    >
      <p>+ {{ addTime }}</p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
#Monitor-Overview-Animate {
}
</style>
