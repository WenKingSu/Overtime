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
  <div id="Monitor-Chat-Twitch" ref="scrollContainer" class="m-3">
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
      <span style="min-width: fit-content">
          {{ msg.displayName }}：
        </span>
      <template v-for="(item, index) of msg.contents" :key="index">
        <Image
            v-if="item.contentType === 'image'"
            :height="item.content.height"
            :src="item.content.url"
            :width="item.content.width"
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
