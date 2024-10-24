<script lang="ts" setup>
</script>

<template>
  <Splitter id="Monitor-Overview" class="w-full h-full">
    <SplitterPanel class="flex items-start justify-start" :size="33">
      <MonitorClock/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start" :size="33">
      <MonitorAnimateArea/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start" :size="33">
      <MonitorChatOverview/>
    </SplitterPanel>
  </Splitter>
</template>

<style lang="scss" scoped>
#Monitor-Overview {
}
</style>
