<script setup lang="ts">
import {useFontStore} from "~/store/fontStore";

const fontStore = useFontStore()

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

  onBeforeMount(()=>{
    getFontList()
  })
}

</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
