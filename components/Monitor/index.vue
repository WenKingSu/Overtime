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

const speakMessage = ref('')
let speech = useSpeechSynthesis(speakMessage.value, {
  voice: selectVoice,
  lang: selectVoice.value ? selectVoice.value['lang'] : 'zh-TW',
  pitch: pitch,
  rate: rate,
  volume: volume.value,
})

const speak = () => {
  if (speech.status.value === 'play') {
    return
  }
  if (queue.value.length > 0) {
    console.log('speech.status.value', speech.status.value)
    if (speech.status.value === 'pause') {
      window.speechSynthesis.resume()
    } else {
      const message = queue.value.pop()
      speech = useSpeechSynthesis(message, {
        voice: selectVoice,
        lang: selectVoice.value ? selectVoice.value['lang'] : 'zh-TW',
        pitch: pitch,
        rate: rate,
        volume: volume.value,
      })
      speech.speak()
      // console.log('speak', message)
    }
  }
  console.log('after queue', queue.value)
}

onMounted(() => {
  twitch.fetchBadges()
  if (twitchActive.value) {
    twitch.connectTwitchWebSocket()
  }
  if (youtubeActive.value) {
    youtube.fetchLiveChat()
  }
  setInterval(() => {
    if (youtubeActive.value) {
      youtube.fetchLiveChat()
    }
  }, (youtubeRefreshTime.value * 1000))

  setInterval(() => {
    speak()
  }, 1000)

  setInterval(() => {
    twitch.getTwitchRefreshToken()
    twitch.disconnectTwitchWebSocket()
    twitch.connectTwitchWebSocket()
  }, 60 * 1000)
  // if (speech.isSupported.value) {
  //   // load at last
  //   setTimeout(() => {
  //     synth.value = window.speechSynthesis
  //     voices.value = synth.value.getVoices()
  //   })
  // }
})

onUnmounted(() => {
  twitch.disconnectTwitchWebSocket()
})


</script>

<template>
  <div id="monitor" class="w-full h-full">
    <Tabs value="0" class="w-full h-full">
      <TabList class="h-10%">
        <Tab value="0">總覽</Tab>
        <Tab value="1">時間顯示</Tab>
        <Tab value="3">聊天室</Tab>
        <Tab value="4">預留</Tab>
      </TabList>
      <TabPanels class="h-90%">
        <TabPanel value="0" class="h-full">
          <MonitorOverview/>
        </TabPanel>
        <TabPanel value="1" class="h-full">
          <MonitorClock/>
        </TabPanel>
        <TabPanel value="3" class="h-full">
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
}
</style>
