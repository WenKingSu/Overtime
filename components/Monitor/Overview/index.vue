<script lang="ts" setup>
</script>

<template>
  <Splitter id="Monitor-Overview" class="w-full h-full">
    <SplitterPanel :size="30" class="flex items-start justify-start">
      <MonitorClock/>
    </SplitterPanel>
    <SplitterPanel :size="15" class="flex items-start justify-start">
      <MonitorAnimateArea/>
    </SplitterPanel>
    <SplitterPanel :size="40" class="flex items-start justify-start">
      <MonitorChatOverview/>
    </SplitterPanel>
    <SplitterPanel :size="15" class="flex items-start justify-start">
      <MonitorSpeechQueue/>
    </SplitterPanel>
  </Splitter>
</template>

<style lang="scss" scoped>
#Monitor-Overview {
}
</style>
