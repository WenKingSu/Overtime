<script lang="ts" setup>

const bgColor = ref('')
const clockFont = ref('')
const clockFontSize = ref('')
const remainingTimeColor = ref('')
const clockBorderColor = ref('')
const clockBorderSize = ref(12)
const animateTime = ref(0)
const animateMoveRange = ref(100)

const {
  data,
  error,
} = useBroadcastChannel({name: 'overtime-animate-channel'})

watch(data, () => {
  if (data.value) {
    bgColor.value = data.value['bgColor']
    clockFont.value = data.value['clockFont']
    clockFontSize.value = data.value['clockFontSize']
    remainingTimeColor.value = data.value['remainingTimeColor']
    clockBorderColor.value = data.value['clockBorderColor']
    clockBorderSize.value = data.value['clockBorderSize']
    animateTime.value = data.value['animateTime']
    animateMoveRange.value = data.value['animateMoveRange']
    addElement(data.value['addTime'])
  }
})

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

</script>

<template>
  <div
      id="Popout-Animate"
      class="w-full h-full flex-y-center justify-center gap-3 relative"
      :style="{backgroundColor: `#${bgColor}`}"
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
            color: `#${remainingTimeColor}`,
            fontFamily: `${clockFont}`,
            'text-shadow': `-${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, -${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}`
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
            color: `#${remainingTimeColor}`,
            fontFamily: `${clockFont}`,
            'text-shadow': `-${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px -${clockBorderSize}px 0 #${clockBorderColor}, -${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}, ${clockBorderSize}px ${clockBorderSize}px 0 #${clockBorderColor}`
          }"
      >

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Popout-Animate {
}
</style>
