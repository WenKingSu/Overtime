<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";

const chatSettingStore = useChatSettingStore()
const {
  twitchBadges,
  messages
} = storeToRefs(chatSettingStore)

const scrollBarBottom = () => {
  const element = document.getElementById("Monitor-Chat-Overview")
  console.log(element?.scrollHeight)
  element.scrollTop = element.scrollHeight + 40
}

watchDeep(messages, () => {
  console.log('update scroll bar')
  scrollBarBottom()
})

onMounted(() => {
  scrollBarBottom()
})
</script>

<template>
  <div id="Monitor-Chat-Overview" class="w-full h-full overflow-y-auto">
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
                v-if="twitchBadges[badge[0]][badge[1]]['image_url_1x']"
                :src="twitchBadges[badge[0]][badge[1]]['image_url_1x']"
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
      <template v-else>
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
