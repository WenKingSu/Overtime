<script lang="ts" setup>
import {useDisplayStore} from "~/store/displayStore";
const displayStore = useDisplayStore();
const {bgColor} = storeToRefs(displayStore)
</script>

<template>
  <div id="monitor" class="w-full h-full " :style="{backgroundColor: `#${bgColor}`}">
    monitor
  </div>
</template>

<style lang="scss" scoped>
#monitor {
}
</style>
