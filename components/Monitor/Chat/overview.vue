<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";

const chatSettingStore = useChatSettingStore()
const {
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
#Monitor-Chat-Overview {
}
</style>
