<script lang="ts" setup>
</script>

<template>
  <Splitter id="Monitor-Overview" class="w-full h-full">
    <SplitterPanel class="flex items-start justify-start" :size="25">
      <MonitorClock/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start" :size="25">
      <MonitorAnimateArea/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start" :size="25">
      <MonitorChatOverview/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start" :size="25">
      <MonitorSpeechQueue/>
    </SplitterPanel>
  </Splitter>
</template>

<style lang="scss" scoped>
#Monitor-Overview {
}
</style>
