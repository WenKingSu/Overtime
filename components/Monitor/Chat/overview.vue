<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";

const chatSettingStore = useChatSettingStore()
const {messages} = storeToRefs(chatSettingStore)
const twitch = useTwitch()

const scrollContainer = ref(null)
const {y} = useScroll(scrollContainer)

const scrollBarBottom = async () => {
  await nextTick()
  y.value = scrollContainer.value.scrollHeight
}

watchDeep(messages, async () => {
  await scrollBarBottom()
})

onMounted(() => {
  scrollBarBottom()
})
</script>

<template>
  <div ref="scrollContainer" id="Monitor-Chat-Overview" class="w-full h-full overflow-y-auto">
    <div
        v-for="msg in messages"
        :key="msg.id"
        class="my-2 flex items-center"
    >
      <Avatar :image="`/images/${msg.channelType}.png`" :style="{'flex-shrink': 0, 'margin-right': '0.2rem'}"/>

      <template v-if="msg.channelType === 'Twitch'">
        <!--        {{ msg.badges }}-->
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
      </template>
      <template v-if="msg.channelType === 'YouTube'">
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
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Overview {
}
</style>
