<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

const displaySettingStore = useDisplaySettingStore()
const {
  clockFont,
  clockFontSize,
  remainingTimeColor,
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

</script>

<template>
  <div id="monitor-clock" class="w-full h-full flex-y-center justify-center gap-3">
    <div id="remaining-time" class="flex justify-between gap-3">
      <span :style="{fontSize: `${clockFontSize}px`}">
        剩餘開台時間：
      </span>
      <span :style="{fontSize: `${clockFontSize}px`, color: `#${remainingTimeColor}`, fontFamily: `${clockFont}`}">
        {{ String(remainingHour).padStart(4, 0) }} :
        {{ String(remainingMinutes).padStart(2, 0) }} :
        {{ String(remainingSecond).padStart(2, 0) }}
      </span>
    </div>
    <div id="elapsed-time" class="flex justify-between gap-3">
      <span :style="{fontSize: `${clockFontSize}px`}">
        已過開台時間：
      </span>
      <span :style="{fontSize: `${clockFontSize}px`, color: `#${elapsedTimeColor}`, fontFamily: `${clockFont}`}">
        {{ String(elapsedHour).padStart(4, 0) }} :
        {{ String(elapsedMinutes).padStart(2, 0) }} :
        {{ String(elapsedSecond).padStart(2, 0) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#monitor-clock {
}
</style>
