<script lang="ts" setup>

import {useChatSettingStore} from "~/store/chatSettingStore";

const route = useRoute()
const chatSettingStore = useChatSettingStore()
const {twitchCode} = storeToRefs(chatSettingStore)

onMounted(() => {
  twitchCode.value = route.query.code
  window.close()
})
</script>

<template>
  <div id="Get-Twitch-Code">
  </div>
</template>

<style lang="scss" scoped>
#Get-Twitch-Code {
}
</style>
