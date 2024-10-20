<script lang="ts" setup>
const youtube = useYouTube()

onMounted(()=>{
  youtube.fetchLiveChat()
})
</script>

<template>
  <div id="Monitor-Chat-Youtube">
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Youtube {
}
</style>
