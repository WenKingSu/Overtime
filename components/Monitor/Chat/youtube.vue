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

onMounted(() => {
  youtube.fetchLiveChat()
  scrollBarBottom()
  setInterval(()=>{
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

      {{ msg.displayName }}:
      <span v-html="msg.content"/>
    </div>
  </div>
<!--  <ScrollPanel ref="scrollContent" id="Youtube-Monitor" style="width: 100%; height: 100%">-->
<!--    <div-->
<!--        v-for="(msg, index) in youtubeMessages"-->
<!--        :key="index"-->
<!--        class="my-2"-->
<!--    >-->
<!--      {{ msg.displayName }}: {{ msg.content }}-->
<!--    </div>-->
<!--  </ScrollPanel>-->
</template>

<style lang="scss" scoped>
#Monitor-Chat-Youtube {
}
</style>
