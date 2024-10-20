<script lang="ts" setup>
</script>

<template>
  <Splitter id="Monitor-Chat" class="w-full h-full">
    <SplitterPanel class="flex items-start justify-start">
      <MonitorChatTwitch/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start">
      <MonitorChatYoutube/>
    </SplitterPanel>
  </Splitter>
</template>

<style lang="scss" scoped>
#Monitor-Chat {
}
</style>
