<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useAnimateSettingStore} from "~/store/animateSettingStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

const config = useRuntimeConfig()

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

const {
  post,
  error,
} = useBroadcastChannel({name: 'overtime-animate-channel'})

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
const postBroadcast = () => {
  const postData = {
    bgColor: bgColor.value,
    clockFont: clockFont.value,
    clockFontSize: clockFontSize.value,
    remainingTimeColor: remainingTimeColor.value,
    clockBorderColor: clockBorderColor.value,
    clockBorderSize: clockBorderSize.value,
    animateTime: animateTime.value,
    animateMoveRange: animateMoveRange.value,
    addTime: addTimeQueue.value[0]
  }
  post(postData)
}
watch(addTimeQueue.value, async () => {
  if (addTimeQueue.value.length > 0) {
    await postBroadcast()
    addElement(addTimeQueue.value.shift())
  }
})

const popoutWindow = ref(null)
const openPopout = () => {
  if (!popoutWindow.value || popoutWindow.value.closed) {
    // `${url.protocol}//${useRequestURL().host}/popout/Animate`,
    popoutWindow.value = window.open(
        `${config.public.host}/popoutAnimate`,
        '_blank',
        'width=800,height=600,location=yes,menubar=no,toolbar=no,status=no'
    )
    setTimeout(() => {
      postBroadcast()
    }, 1000)
  } else {
    newWindow.value.focus()
  }
}

onBeforeUnmount(() => {
  if (popoutWindow.value && !popoutWindow.value.closed) {
    popoutWindow.value.close()
  }
})
</script>

<template>
  <div
      id="Monitor-Overview-Animate"
      class="w-full h-full flex-y-center justify-center gap-3 relative"
      :style="{backgroundColor: `${bgColor}`}"
  >
    <div
        class="flex-center "
        :style="{
          height:`${animateMoveRange * 3}px`,
          fontSize: `${clockFontSize}px`,
          fontFamily: `${clockFont}`,
        }"
    >
      <div
          v-for="item in elements"
          :key="item.id"
          class="absolute m-1rem p-1rem"
          ref="itemRefs"
          :style="{
            fontSize: `${clockFontSize}px`,
            color: `${remainingTimeColor}`,
            fontFamily: `${clockFont}`,
            'text-stroke': `${clockBorderSize}px ${clockBorderColor}`,
          }"
      >
        + {{ item.text }}
      </div>

      <!--定位用-->
      <div
          class="absolute m-1rem p-1rem border border-black b-b-solid"
          :style="{
            width: '8rem',
            height:`${animateMoveRange}px`,
            fontSize: `${clockFontSize}px`,
            color: `${remainingTimeColor}`,
            fontFamily: `${clockFont}`,
            'text-stroke': `${clockBorderSize}px ${clockBorderColor}`,
          }"
      >

      </div>
    </div>

    <div class="absolute bottom-4 right-4">
      <Button
          icon="pi pi-window-maximize"
          severity="secondary"
          aria-label="window-maximize"
          rounded
          @click="openPopout"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Overview-Animate {
}
</style>
