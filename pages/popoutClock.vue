<script lang="ts" setup>
import {useFontStore} from "~/store/fontStore";
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

const fontStore = useFontStore()
const config = useRuntimeConfig()

const displaySettingStore = useDisplaySettingStore()
const {
  bgColor,
  clockFont,
  clockFontSize,
  remainingTimeColor,
  clockBorderColor,
  clockBorderSize,
  elapsedTimeColor
} = storeToRefs(displaySettingStore)
const clockSettingStore = useClockSettingStore()
const {
  remainingHour,
  remainingMinutes,
  remainingSecond,
  elapsedHour,
  elapsedMinutes,
  elapsedSecond,
} = storeToRefs(clockSettingStore)


const getFontList = () => {
  const style = document.createElement('style')
  style.type = 'text/css'
  let fonts = ''
  for (const fontInfo of fontStore.fontInfos) {
    let fontItem = `
    @font-face {
      font-family: '${fontInfo.name}';
      src: local('${fontInfo.url}'),
      url(.${fontInfo.url}) format('truetype');
    }
    `
    fonts += fontItem
  }
  style.innerHTML = fonts
  document.head.appendChild(style)
}

onMounted(() => {
  getFontList()
})
</script>

<template>
  <div
      id="Popout-Clock"
      :style="{backgroundColor: `${bgColor}`}"
      class="w-full h-full flex-y-center justify-center"
  >
    <div class="self-center flex-y-center justify-center gap-3 border border-black border-solid p-2rem">
      <div id="remaining-time" class="flex justify-between gap-3">
        <span :style="{fontSize: `${clockFontSize}px`}">
          剩餘：
        </span>
        <span
            :style="{
              fontSize: `${clockFontSize}px`,
              color: `${remainingTimeColor}`,
              fontFamily: `${clockFont}`,
              'text-stroke': `${clockBorderSize}px ${clockBorderColor}`,
            }"
        >
          {{ String(remainingHour).padStart(4, 0) }}:{{
            String(remainingMinutes).padStart(2, 0)
          }}:{{ String(remainingSecond).padStart(2, 0) }}
        </span>
      </div>
      <div id="elapsed-time" class="flex justify-between gap-3">
        <span :style="{fontSize: `${clockFontSize}px`}">
          已過：
        </span>
        <span
            :style="{
              fontSize: `${clockFontSize}px`,
              color: `${elapsedTimeColor}`,
              fontFamily: `${clockFont}`,
              'text-stroke': `${clockBorderSize}px ${clockBorderColor}`,
            }"
        >
          {{ String(elapsedHour).padStart(4, 0) }}:{{
            String(elapsedMinutes).padStart(2, 0)
          }}:{{ String(elapsedSecond).padStart(2, 0) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Popout-Clock {
}
</style>
