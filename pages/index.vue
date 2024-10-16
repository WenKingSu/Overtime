<script lang="ts" setup>
import Monitor from "~/components/monitor.vue";
</script>

<template>
  <div id="main">
    <Splitter class="h-full" layout="vertical">
      <SplitterPanel>
        <Monitor/>
      </SplitterPanel>
      <SplitterPanel>
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
