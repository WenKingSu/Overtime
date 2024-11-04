<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

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
  remainingTime,
  remainingHour,
  remainingMinutes,
  remainingSecond,
  elapsedHour,
  elapsedMinutes,
  elapsedSecond,
} = storeToRefs(clockSettingStore)

const {
  post,
  error,
} = useBroadcastChannel({name: 'overtime-clock-channel'})


const broadcastData = () => {
  post({
    bgColor: bgColor.value,
    clockFont: clockFont.value,
    clockFontSize: clockFontSize.value,
    remainingTimeColor: remainingTimeColor.value,
    clockBorderColor: clockBorderColor.value,
    clockBorderSize: clockBorderSize.value,
    elapsedTimeColor: elapsedTimeColor.value,
    remainingHour: remainingHour.value,
    remainingMinutes: remainingMinutes.value,
    remainingSecond: remainingSecond.value,
    elapsedHour: elapsedHour.value,
    elapsedMinutes: elapsedMinutes.value,
    elapsedSecond: elapsedSecond.value,
  })
}

watch(remainingTime, () => {
  broadcastData()
})

const popoutWindow = ref(null)
const openPopout = () => {
  if (!popoutWindow.value || popoutWindow.value.closed) {
    // `${url.protocol}//${useRequestURL().host}/popout/Clock`,
    popoutWindow.value = window.open(
        `${config.public.host}/popout/Clock`,
        '_blank',
        'width=800,height=600,location=yes,menubar=no,toolbar=no,status=no'
    )
  } else {
    popoutWindow.value.focus()
  }
}

onBeforeUnmount(() => {
  if (popoutWindow.value && !popoutWindow.value.closed) {
    popoutWindow.value.close()
  }
})

onMounted(() => {
  setInterval(() => {
    if (popoutWindow.value) {
      broadcastData()
    }
  }, 250)
})
</script>

<template>

  <div
      id="monitor-clock"
      class="w-full h-full flex-y-center justify-center relative"
      :style="{backgroundColor: `${bgColor}`}"
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
#monitor-clock {
}
</style>
