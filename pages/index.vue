<script lang="ts" setup>
import {useFontStore} from "~/store/fontStore";
import {useClockSettingStore} from "~/store/clockSettingStore";

const fontStore = useFontStore()
const clockSettingStore = useClockSettingStore();
const {run} = storeToRefs(clockSettingStore)

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

  window.setInterval(() => {
    if (run.value) {
      clockSettingStore.minusSecond()
    }
  }, 1000)
})

</script>

<template>
  <div id="main" class="h-full">
    <Splitter class="h-full" layout="vertical">
      <SplitterPanel>
        <Monitor/>
      </SplitterPanel>
      <SplitterPanel style="overflow-y: auto">
        <Console/>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<style lang="scss" scoped>
#main {
  height: 100vh;
}

</style>
