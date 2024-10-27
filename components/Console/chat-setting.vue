<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
import {useSpeakSettingStore} from "~/store/speakSettingStore";

const chatSettingStore = useChatSettingStore()
const {
  twitchActive,
  twitchClientId,
  twitchClientSecret,
  twitchChannel,
  twitchRefreshToken,
  twitchAccessToken,
  twitchCode,
  twitchBroadcasterId,
  youtubeActive,
  youtubeToken,
  youtubeVideoId,
  youtubeRefreshTime,
  filterPrefix,
  blockUsers
} = storeToRefs(chatSettingStore)

const speakSettingStore = useSpeakSettingStore()
const {
  synth,
  voices,
  pitch,
  rate,
  voice,
  selectVoice,
  volume,
  speakActive
} = storeToRefs(speakSettingStore)

const twitch = useTwitch()

// const selectVoice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
const testText = ref('Welcome 歡迎使用 加班台小工具')
const saveVolume = ref(0)

let speech = useSpeechSynthesis(testText, {
  voice: selectVoice,
  lang: selectVoice.value ? selectVoice.value['lang'] : 'zh-TW',
  pitch: pitch,
  rate: rate,
  volume: volume.value,
})

function testSpeak() {
  if (speech.status.value === 'pause') {
    window.speechSynthesis.resume()
  } else {
    speech.speak()
  }
}

const changeVoice = () => {
  for (const v of voices.value) {
    if (v.name === voice.value) {
      selectVoice.value = v
      return
    }
  }
  selectVoice.value = voices.value[0]
}

const changeSpeech = () => {
  speech = useSpeechSynthesis(testText, {
    voice: selectVoice,
    lang: selectVoice.value ? selectVoice.value['lang'] : 'zh-TW',
    pitch: pitch,
    rate: rate,
    volume: volume.value,
  })
}

const changeTwitchActive = () => {
  if (twitchActive.value) {
    twitch.connectTwitchWebSocket()
  } else {
    twitch.disconnectTwitchWebSocket()
  }
}

const changeSpeakActive = () => {
  if (speakActive.value) {
    volume.value = saveVolume.value
  } else {
    saveVolume.value = volume.value
    volume.value = 0
  }
}

onMounted(async () => {
  if (speech.isSupported.value) {
    // load at last
    setTimeout(() => {
      synth.value = window.speechSynthesis
      voices.value = synth.value.getVoices()
      changeVoice()
    })
  }
  await nextTick()
  changeVoice()
})

</script>

<template>
  <div id="Chat-Setting" class="overflow-y-auto">

    <Fieldset legend="語音設定" class="w-full">
      <template #legend>
        <div class="flex items-center pl-2">
          <ToggleSwitch v-model="speakActive" @change="changeSpeakActive"/>
          <span class="font-bold p-2">語音設定</span>
        </div>
      </template>
      <InputGroup>
        <InputGroupAddon class="w-8rem" style="justify-content: left">
          語速
        </InputGroupAddon>
        <InputText v-model="rate" disabled/>
      </InputGroup>
      <Slider v-model="rate" :min="0.5" :max="2" :step="0.1" class="my-5" @change="changeSpeech"/>
      <InputGroup>
        <InputGroupAddon class="w-8rem" style="justify-content: left">
          音調
        </InputGroupAddon>
        <InputText v-model="pitch" disabled/>
      </InputGroup>
      <Slider v-model="pitch" :min="0" :max="2" :step="0.1" class="my-5" @change="changeSpeech"/>
      <InputGroup>
        <InputGroupAddon class="w-8rem" style="justify-content: left">
          音量
        </InputGroupAddon>
        <InputText v-model="volume" disabled/>
      </InputGroup>
      <Slider v-model="volume" :min="0" :max="1" :step="0.05" class="my-5" @change="changeSpeech"
              :disabled="!speakActive"/>
      <InputGroup class="clock-font">
        <InputGroupAddon>
          語音模型
        </InputGroupAddon>
        <Select v-model="voice"
                :options="voices"
                optionLabel="name"
                optionValue="name"
                :highlightOnSelect="false"
                class="w-full md:w-56"
                @change="changeVoice">
          >
          <template #value="slotProps">
            <div>{{ slotProps.value }}</div>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }} ( {{ slotProps.option.lang }} )</div>
            </div>
          </template>
        </Select>
      </InputGroup>
      <InputGroup class="my-3">
        <InputGroupAddon class="w-8rem" style="justify-content: left">
          測試區
        </InputGroupAddon>
        <InputText v-model="testText"/>
        <Button label="測試" icon="pi pi-send" severity="warn" @click="testSpeak"/>
      </InputGroup>
    </Fieldset>

    <Fieldset legend="語音過濾器設定" class="w-full">
      <div class="flex flex-col justify-between gap-y-3">
        <!--        <InputGroup>-->
        <!--          <InputGroupAddon class="w-8rem" style="justify-content: left">-->
        <!--            新增-->
        <!--          </InputGroupAddon>-->
        <!--          <InputText v-model="filterText"/>-->
        <!--          <Button label="新增" icon="pi pi-send" severity="warn" @click="addFilter"/>-->
        <!--        </InputGroup>-->
        <div class="my-3">
          <Chips class="w-full" v-model="filterPrefix"/>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="語音噤聲名單" class="w-full">
      <div class="flex flex-col justify-between gap-y-3">
        <div class="my-3 ">
          <Chips class="w-full" v-model="blockUsers"/>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Youtube設定" class="w-full">
      <template #legend>
        <div class="flex items-center pl-2">
          <ToggleSwitch v-model="youtubeActive"/>
          <span class="font-bold p-2">Youtube設定</span>
        </div>
      </template>
      <div class="flex flex-col justify-between gap-y-3">
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Video ID
          </InputGroupAddon>
          <InputText v-model="youtubeVideoId"/>
        </InputGroup>
        <!--                <InputGroup>-->
        <!--                  <InputGroupAddon class="w-8rem" style="justify-content: left">-->
        <!--                    Token-->
        <!--                  </InputGroupAddon>-->
        <!--                  <InputText v-model="youtubeToken"/>-->
        <!--                </InputGroup>-->
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            更新時間
          </InputGroupAddon>
          <InputNumber v-model="youtubeRefreshTime" :min="3" placeholder="秒"/>
        </InputGroup>
      </div>
    </Fieldset>

    <Fieldset legend="Twitch設定" class="w-full">
      <template #legend>
        <div class="flex items-center pl-2">
          <ToggleSwitch v-model="twitchActive" @change="changeTwitchActive"/>
          <span class="font-bold p-2">Twitch設定</span>
        </div>
      </template>
      <div class="flex flex-col justify-between gap-y-3">
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Channel
          </InputGroupAddon>
          <InputText v-model="twitchChannel"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Client ID
          </InputGroupAddon>
          <InputText v-model="twitchClientId"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Client Secret
          </InputGroupAddon>
          <InputText v-model="twitchClientSecret"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Broadcaster ID
          </InputGroupAddon>
          <InputText v-model="twitchBroadcasterId" disabled/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Code
          </InputGroupAddon>
          <InputText v-model="twitchCode" disabled/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Access Token
          </InputGroupAddon>
          <InputText v-model="twitchAccessToken" disabled/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Refresh Token
          </InputGroupAddon>
          <InputText v-model="twitchRefreshToken" disabled/>
        </InputGroup>
      </div>
      <div class="flex my-3 gap-3">
        <Button label="Step 1. 取得授權" icon="pi pi-play" severity="success" @click="twitch.getTwitchCode()"/>
        <Button label="Step 2. 取得Access Token" icon="pi pi-play" severity="success"
                @click="twitch.getTwitchAccessToken()"/>
        <Button label="Step 3. 更新憑證" icon="pi pi-play" severity="success" @click="twitch.getTwitchRefreshToken()"/>
      </div>
    </Fieldset>


  </div>
</template>

<style lang="scss" scoped>
#Chat-Setting {
}
</style>
