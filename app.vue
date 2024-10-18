<script setup lang="ts">
onMounted(async () => {
  const time = await window.ipcRenderer.invoke('app-start-time')
  console.log('App start time:', time)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
