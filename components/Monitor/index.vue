<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
import {useSpeakSettingStore} from "~/store/speakSettingStore";

const chatSettingStore = useChatSettingStore()
const {
  twitchActive,
  youtubeActive,
  youtubeRefreshTime
} = storeToRefs(chatSettingStore)
const speakSettingStore = useSpeakSettingStore()
const {queue} = storeToRefs(speakSettingStore)
const {
  synth,
  voices,
  pitch,
  rate,
  voice,
  selectVoice,
  volume
} = storeToRefs(speakSettingStore)

const twitch = useTwitch()
const youtube = useYouTube()

const {
  data,
  error,
} = useBroadcastChannel({name: 'overtime-channel'})

const message = ref('')

const speakMessage = ref('')
let speech = useSpeechSynthesis(speakMessage.value, {
  voice: selectVoice,
  lang: selectVoice.value ? selectVoice.value['lang'] : 'zh-TW',
  pitch: pitch,
  rate: rate,
  volume: volume.value,
})

const speak = () => {
  if (['play'].includes(speech.status.value)) {
    return
  }
  if (queue.value.length > 0) {
    console.log('speech.status.value', speech.status.value)
    if (speech.status.value === 'pause') {
      window.speechSynthesis.resume()
    } else {
      const message = queue.value.shift()
      speech = useSpeechSynthesis(message, {
        voice: selectVoice,
        lang: selectVoice.value ? selectVoice.value['lang'] : 'zh-TW',
        pitch: pitch,
        rate: rate,
        volume: volume.value,
      })
      speech.speak()
      console.log('speak', message)
      console.log('queue', queue.value)
    }
  }
}

onMounted(() => {
  twitch.fetchBadges()
  if (twitchActive.value) {
    twitch.connectTwitchWebSocket()
  }
  if (youtubeActive.value) {
    youtube.fetchLiveChat(true)
  }
  setInterval(() => {
    if (youtubeActive.value) {
      youtube.fetchLiveChat(false)
    }
  }, (youtubeRefreshTime.value * 1000))

  setInterval(() => {
    speak()
  }, 1000)

  setInterval(() => {
    twitch.getTwitchRefreshToken()
    twitch.disconnectTwitchWebSocket()
    if (twitchActive.value) {
      twitch.connectTwitchWebSocket()
    }
  }, 60 * 60 * 1000)
})

onUnmounted(() => {
  twitch.disconnectTwitchWebSocket()
})


</script>

<template>
  <div id="monitor" class="w-full h-full">
    <Tabs class="w-full h-full" value="0">
      <TabList class="tab-list-fixed h-10%">
        <Tab value="0">總覽</Tab>
        <Tab value="1">時間顯示</Tab>
        <Tab value="3">聊天室</Tab>
        <!--        <Tab value="4">預留</Tab>-->
      </TabList>
      <TabPanels class="h-95%">
        <TabPanel value="0" class="h-full">
          <MonitorOverview/>
        </TabPanel>
        <TabPanel class="h-full" value="1">
          <MonitorClock/>
        </TabPanel>
        <TabPanel class="h-full" value="3">
          <MonitorChat/>
        </TabPanel>
        <!--        <TabPanel value="2">-->
        <!--          <ConsoleCommonSetting/>-->
        <!--        </TabPanel>-->
        <!--        <TabPanel value="2">-->
        <!--          <p class="m-0">-->
        <!--            預留 2-->
        <!--          </p>-->
        <!--        </TabPanel>-->
      </TabPanels>
    </Tabs>
  </div>
</template>

<style lang="scss" scoped>
#monitor {
  .p-tabpanels {
    padding: 0;
  }

  .tab-list-fixed {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10; /* 調整這個數值以確保固定元素不會被覆蓋 */
    height: fit-content;
  }
}
</style>
