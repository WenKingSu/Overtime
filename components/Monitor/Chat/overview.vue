<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
const config = useRuntimeConfig()

const chatSettingStore = useChatSettingStore()
const {messages} = storeToRefs(chatSettingStore)
const twitch = useTwitch()

const scrollContainer = ref(null)
const {y} = useScroll(scrollContainer)

const scrollBarBottom = async () => {
  await nextTick()
  y.value = scrollContainer.value.scrollHeight
}

const {
  post,
  error,
} = useBroadcastChannel({name: 'overtime-chat-channel'})

watchDeep(messages, async () => {
  await scrollBarBottom()
  post({
    'messages': JSON.stringify(messages.value),
  })
})

onMounted(() => {
  scrollBarBottom()
})

const popoutWindow = ref(null)
const openPopout = () => {
  const url = useRequestURL()
  if (!popoutWindow.value || popoutWindow.value.closed) {
    // `${url.protocol}//${useRequestURL().host}/popout/Chat`,
    popoutWindow.value = window.open(
        `${config.public.host}/popoutChat`,
        '_blank',
        'width=800,height=600,location=yes,menubar=no,toolbar=no,status=no'
    )
    setTimeout(()=>{
      post({
        'messages': JSON.stringify(messages.value),
      })
    },1000)
  } else {
    newWindow.value.focus()
  }
}

onBeforeUnmount(() => {
  if (popoutWindow.value && !popoutWindow.value.closed) {
    popoutWindow.value.close()
  }
})
</script>

<template>
  <div ref="scrollContainer" id="Monitor-Chat-Overview" class="w-full h-full overflow-y-auto relative">
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
        <span style="min-width: fit-content">
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
        <span style="min-width: fit-content">
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

    <div class="absolute bottom-4 right-4">
      <Button
          icon="pi pi-window-maximize"
          severity="secondary"
          aria-label="window-maximize"
          rounded
          @click="openPopout"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Overview {
}
</style>
