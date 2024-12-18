<script lang="ts" setup>
import {useFontStore} from "~/store/fontStore";

const fontStore = useFontStore()
const bgColor = ref('')
const clockFont = ref('')
const clockFontSize = ref('')
const remainingTimeColor = ref('')
const clockBorderColor = ref('')
const clockBorderSize = ref(12)
const animateTime = ref(0)
const animateMoveRange = ref(100)

const getFontList = () => {
  const style = document.createElement('style')
  style.type = 'text/css'
  let fonts = ''
  for (const fontInfo of fontStore.fontInfos) {
    let fontItem = `
    @font-face {
      font-family: '${fontInfo.name}';
      src: local('${fontInfo.url}'),
      url(..${fontInfo.url}) format('truetype');
    }
    `
    fonts += fontItem
  }
  style.innerHTML = fonts
  document.head.appendChild(style)
}

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

onMounted(() => {
  getFontList()
})
</script>

<template>
  <div
      id="Popout-Animate"
      :style="{backgroundColor: `${bgColor}`}"
      class="w-full h-full flex-y-center justify-center gap-3 relative"
  >
    <div
        :style="{
          height:`${animateMoveRange * 3}px`,
          fontSize: `${clockFontSize}px`,
          fontFamily: `${clockFont}`,
        }"
        class="flex-center "
    >
      <div
          v-for="item in elements"
          :key="item.id"
          ref="itemRefs"
          :style="{
            fontSize: `${clockFontSize}px`,
            color: `${remainingTimeColor}`,
            fontFamily: `${clockFont}`,
            'text-stroke': `${clockBorderSize}px ${clockBorderColor}`,
            paddingTop: '120px',
          }"
          class="absolute m-1rem p-1rem"
      >
        +{{ item.text }}
      </div>

      <!--定位用-->
      <div
          :style="{
            width: '8rem',
            height:`${animateMoveRange}px`,
            fontSize: `${clockFontSize}px`,
            color: `${remainingTimeColor}`,
            fontFamily: `${clockFont}`,
            'text-stroke': `${clockBorderSize}px ${clockBorderColor}`
          }"
          class="absolute m-1rem p-1rem border border-black b-b-solid"
      >

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Popout-Animate {
}
</style>
