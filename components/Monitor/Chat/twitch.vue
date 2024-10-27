<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";

const chatSettingStore = useChatSettingStore()
const {twitchMessages} = storeToRefs(chatSettingStore)
const twitch = useTwitch()

const scrollContainer = ref(null)
const {y} = useScroll(scrollContainer)

const scrollBarBottom = async () => {
  await nextTick()
  y.value = scrollContainer.value.scrollHeight
}

watchDeep(twitchMessages, async () => {
  await scrollBarBottom()
})

onMounted(() => {
  scrollBarBottom()
})
</script>

<template>
  <div ref="scrollContainer" id="Monitor-Chat-Twitch" class="m-3">
    <div
        v-for="msg in twitchMessages"
        :key="msg.id"
        class="my-2 flex items-center"
    >
      <template v-if="msg.badges">
        <template v-for="(badge, index) of Object.entries(msg.badges)" :key="index">
          <Image
              v-if="twitch.fetchBadgeUrl(badge)"
              :src="twitch.fetchBadgeUrl(badge)"
              class="mr-1"
          />
        </template>
      </template>
      <span>
          {{ msg.displayName }}：
        </span>
      <template v-for="(item, index) of msg.contents" :key="index">
        <Image
            v-if="item.contentType === 'image'"
            :src="item.content.url"
            :width="item.content.width"
            :height="item.content.height"
        />
        <span v-if="item.contentType === 'text'">{{ item.content }}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Twitch {
}
</style>
