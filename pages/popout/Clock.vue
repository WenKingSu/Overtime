<script lang="ts" setup>

const bgColor = ref('')
const clockFont = ref('')
const clockFontSize = ref('')
const remainingTimeColor = ref('')
const clockBorderColor = ref('')
const clockBorderSize = ref(12)
const elapsedTimeColor = ref('')
const remainingHour = ref(0)
const remainingMinutes = ref(0)
const remainingSecond = ref(0)
const elapsedHour = ref(0)
const elapsedMinutes = ref(0)
const elapsedSecond = ref(0)

const {
  data,
  error,
} = useBroadcastChannel({name: 'overtime-clock-channel'})

watch(data, () => {
  if (data.value) {
    bgColor.value = data.value['bgColor']
    clockFont.value = data.value['clockFont']
    clockFontSize.value = data.value['clockFontSize']
    remainingTimeColor.value = data.value['remainingTimeColor']
    clockBorderColor.value = data.value['clockBorderColor']
    clockBorderSize.value = data.value['clockBorderSize']
    elapsedTimeColor.value = data.value['elapsedTimeColor']
    remainingHour.value = data.value['remainingHour'];
    remainingMinutes.value = data.value['remainingMinutes']
    remainingSecond.value = data.value['remainingSecond']
    elapsedHour.value = data.value['elapsedHour']
    elapsedMinutes.value = data.value['elapsedMinutes']
    elapsedSecond.value = data.value['elapsedSecond']
  }
})
</script>

<template>
  <div
      id="Popout-Clock"
      class="w-full h-full flex-y-center justify-center"
      :style="{backgroundColor: `#${bgColor}`}"
  >
    <div class="flex-y-center justify-center gap-3 border border-black border-solid p-2rem">
      <div id="remaining-time" class="flex justify-between gap-3">
        <span :style="{fontSize: `${clockFontSize}px`}">
          剩餘開台時間：
        </span>
        <span
            :style="{
              fontSize: `${clockFontSize}px`,
              color: `#${remainingTimeColor}`,
              fontFamily: `${clockFont}`,
              'text-shadow': `-${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, -${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}`
            }"
        >
        {{ String(remainingHour).padStart(4, 0) }}:
        {{ String(remainingMinutes).padStart(2, 0) }}:
        {{ String(remainingSecond).padStart(2, 0) }}
      </span>
      </div>
      <div id="elapsed-time" class="flex justify-between gap-3">
      <span :style="{fontSize: `${clockFontSize}px`}">
        已過開台時間：
      </span>
        <span
            :style="{
              fontSize: `${clockFontSize}px`,
              color: `#${elapsedTimeColor}`,
              fontFamily: `${clockFont}`,
              'text-shadow': `-${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, -${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}`
            }"
        >
        {{ String(elapsedHour).padStart(4, 0) }}:
        {{ String(elapsedMinutes).padStart(2, 0) }}:
        {{ String(elapsedSecond).padStart(2, 0) }}
      </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Popout-Clock {
}
</style>
