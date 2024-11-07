<script lang="ts" setup>
const twitch = useTwitch()
const messages = ref([])

const scrollContainer = ref(null)
const {y} = useScroll(scrollContainer)

const scrollBarBottom = async () => {
  await nextTick()
  y.value = scrollContainer.value.scrollHeight
}

const {
  data,
  error,
} = useBroadcastChannel({name: 'overtime-chat-channel'})

watchDeep(messages, async () => {
  await scrollBarBottom()
})

watch(data, () => {
  if (data.value) {
    messages.value = JSON.parse(data.value['messages']);
  }
})

onMounted(() => {
  twitch.fetchBadges()
  scrollBarBottom()
})
</script>

<template>
  <div id="Popout-Chat" ref="scrollContainer" class="w-full h-full overflow-y-auto">
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
              :height="item.content.height"
              :src="item.content.url"
              :width="item.content.width"
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
              :height="item.content.height"
              :src="item.content.url"
              :width="item.content.width"
          />
          <span v-if="item.contentType === 'text'">{{ item.content }}</span>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Popout-Clock {
}
</style>
