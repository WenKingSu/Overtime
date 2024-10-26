<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
import {useSpeakSettingStore} from "~/store/speakSettingStore";

const chatSettingStore = useChatSettingStore()
const {
  twitchMessages,
} = storeToRefs(chatSettingStore)
const speakSettingStore = useSpeakSettingStore()
const {
  queue
} = storeToRefs(speakSettingStore)

</script>

<template>
  <div id="Monitor-Chat-Twitch" class="m-3">
    <div
        v-for="msg in twitchMessages"
        :key="msg.id"
        class="my-2"
    >
      <span>
        {{ msg.displayName }}
      </span>
      <span>
        ：
      </span>
      <template v-for="(item, index) of msg.contents" :key="index">
        <Image v-if="item.contentType === 'image'" :src="item.content.url" :width="item.content.width"
               :height="item.content.height"/>
        <span v-else>{{ item.content }}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Twitch {
}
</style>
