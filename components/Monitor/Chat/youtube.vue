<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";

const youtube = useYouTube()
const chatSettingStore = useChatSettingStore()
const {youtubeMessages} = storeToRefs(chatSettingStore)

const scrollContainer = ref(null)
const {y} = useScroll(scrollContainer)

const scrollBarBottom = async () => {
  await nextTick()
  y.value = scrollContainer.value.scrollHeight
}

watchDeep(youtubeMessages, () => {
  scrollBarBottom()
})

</script>

<template>
  <div id="Monitor-Chat-Youtube" ref="scrollContainer" class="w-full h-full overflow-y-auto">
    <div
        v-for="(msg, index) in youtubeMessages"
        :key="index"
        class="my-2"
    >

      <span style="min-width: fit-content">
        {{ msg.displayName }}
      </span>
      <span>
        ：
      </span>
      <template v-for="(item, index) of msg.contents" :key="index">
        <Image
            v-if="item.contentType === 'image'"
            :height="item.content.height"
            :src="item.content.url"
            :width="item.content.width"
        />
        <span v-else>{{ item.content }}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Youtube {
}
</style>
