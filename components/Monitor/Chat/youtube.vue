<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";

const youtube = useYouTube()
const chatSettingStore = useChatSettingStore()
const {
  youtubeMessages,
  youtubeRefreshTime
} = storeToRefs(chatSettingStore)

const scrollBarBottom = () => {
  const element = document.getElementById("Monitor-Chat-Youtube")
  element.scrollTop = element.scrollHeight
}

onMounted(async () => {
  await youtube.fetchLiveChat()
  scrollBarBottom()
  setInterval(() => {
    youtube.fetchLiveChat()
    scrollBarBottom()
  }, (youtubeRefreshTime.value * 1000))
})
</script>

<template>
  <div id="Monitor-Chat-Youtube" class="w-full h-full overflow-y-auto">
    <div
        v-for="(msg, index) in youtubeMessages"
        :key="index"
        class="my-2"
    >

      <span>
        {{ msg.displayName }}
      </span>
      <span>
        ：
      </span>
      <template v-for="(item, index) of msg.contents" :key="index">
        <Image v-if="item.contentType === 'image'" :src="item.content.url" :width="item.content.width" :height="item.content.height" />
        <span v-else>{{item.content}}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Youtube {
}
</style>
