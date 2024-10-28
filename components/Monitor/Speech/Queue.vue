<script lang="ts" setup>
import {useSpeakSettingStore} from "~/store/speakSettingStore";

const speakSettingStore = useSpeakSettingStore()
const {queue} = storeToRefs(speakSettingStore)
</script>

<template>
  <div id="Monitor-Speech-Queue">
    <h1>語音列隊</h1>
    <div
        v-for="(message, index) of queue"
        :key="index"
    >
      {{message}}
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Speech-Queue {
}
</style>
