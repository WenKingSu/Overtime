<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import type {MaybeElement} from "@vueuse/core";
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

const addTime = ref(null)

const el = shallowRef<MaybeElement>()
const {
  play,
  playState
} = useAnimate(
    el,
    [
      {opacity: 1, transform: 'translateY(0px)'}, // 出现时的最终状态
      {opacity: 0, transform: `translateY(-${animateMoveRange.value}px)`}, // 初始状态
    ],
    {
      duration: animateTime.value * 1000, // 动画持续时间
      fill: 'forwards', // 保持最终状态
    },
)

onMounted(() => {
  addTimeQueue.value.push('15')
  // addTimeQueue.value.push('60')
  // setInterval(() => {
  //   if (addTimeQueue.value.length > 0 && playState.value === 'finished') {
  //     addTime.value = addTimeQueue.value.pop()
  //     clockSettingStore.plusMinutes(addTime.value)
  //     play()
  //   }
  // }, 1000)
})
</script>

<template>
  <div
      id="Monitor-Overview-Animate"
      class="w-full h-full flex-y-center justify-center gap-3"
      :style="{backgroundColor: `#${bgColor}`}"
  >
    <div class="relative">
      <transition-group name="fade-up" tag="div">
        <div
            v-for="(addTime, index) in addTimeQueue"
            :key="index"
            class="image-item"
        >
          {{ addTime }}
        </div>
      </transition-group>
    </div>
<!--    <div-->
<!--        ref="el"-->
<!--        :style="{-->
<!--      fontSize: `${clockFontSize}px`,-->
<!--      color: `#${remainingTimeColor}`,-->
<!--      fontFamily: `${clockFont}`,-->
<!--      'text-shadow': `-${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, -${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}`-->
<!--    }"-->
<!--    >-->
<!--      <p>+ {{ addTime }}</p>-->
<!--    </div>-->

  </div>
</template>

<style lang="scss" scoped>
#Monitor-Overview-Animate {
  .image-item {
    position: absolute;
    top: 0;
    left: 0;
  }

  .fade-up-enter-active {
    transition: all 0.3s ease-out;
  }

  .fade-up-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-up-enter-from,
  .fade-up-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
