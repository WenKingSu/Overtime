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
  // if (speakActive.value) {
  //   volume.value = saveVolume.value
  // } else {
  //   saveVolume.value = volume.value
  //   volume.value = 0
  // }
  speakSettingStore.addSpeechQueue(blockUsers.value, filterPrefix.value, 'test', testText.value);
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
    <Fieldset class="w-full" legend="語音設定">
      <template #legend>
        <div class="flex items-center">
          <ToggleSwitch v-model="speakActive" @change="changeSpeakActive"/>
          <span class="font-bold p-2">語音設定</span>
        </div>
      </template>
      <div>
        <Fluid>
          <div class="grid grid-cols-2 gap-x-3">
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">語速</label>
              <InputText v-model="rate" disabled/>
              <Slider v-model="rate" :max="2" :min="0.5" :step="0.1" class="my-5" @change="changeSpeech"/>
            </div>
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">音調</label>
              <InputText v-model="pitch" disabled/>
              <Slider v-model="pitch" :max="2" :min="0" :step="0.1" class="my-5" @change="changeSpeech"/>
            </div>
            <div class="col-span-full">
              <label class="font-bold mb-2 block" for="fluid">音量</label>
              <InputText v-model="volume" disabled/>
              <Slider v-model="volume" :disabled="!speakActive" :max="1" :min="0" :step="0.05" class="my-5"
                      @change="changeSpeech"/>
            </div>
          </div>
        </Fluid>
        <div class="grid gap-3">
          <div>
            <label class="font-bold mb-2 block" for="fluid">語音模型</label>
            <Select v-model="voice"
                    :highlightOnSelect="false"
                    :options="voices"
                    class="voicemodel w-full"
                    optionLabel="name"
                    optionValue="name"
                    @change="changeVoice">
              <template #value="slotProps">
                <div>{{ slotProps.value }}</div>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.name }} ( {{ slotProps.option.lang }} )</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="flex testText gap-3">
            <FloatLabel class="flex-1" variant="in">
              <InputText id="testText" v-model="testText" class="w-full"/>
              <label for="testText">語音測試區</label>
            </FloatLabel>
            <div class="flex gap-3 flex-center">
              <Button icon="pi pi-send" label="測試" severity="warn" @click="testSpeak"/>
            </div>
          </div>
        </div>
      </div>
    </Fieldset>
    <Fieldset class="w-full" legend="語音進階設定">
      <div class="grid gap-3">
        <div class="col-span-full">
          <label class="font-bold mb-2 block" for="fluid">過濾詞彙</label>
          <Chips v-model="filterPrefix" class="w-full"/>
        </div>
        <div class="col-span-full">
          <label class="font-bold mb-2 block" for="fluid">噤聲名單</label>
          <Chips v-model="blockUsers" class="w-full"/>
        </div>
      </div>
    </Fieldset>

    <Fieldset class="w-full" legend="Youtube 設定">
      <template #legend>
        <div class="flex items-center">
          <ToggleSwitch v-model="youtubeActive"/>
          <span class="font-bold p-2">Youtube 設定</span>
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

    <Fieldset class="w-full" legend="Twitch 設定">
      <template #legend>
        <div class="flex items-center">
          <ToggleSwitch v-model="twitchActive" @change="changeTwitchActive"/>
          <span class="font-bold p-2">Twitch 設定</span>
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
          <Password v-model="twitchClientId" :feedback="false" toggleMask/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Client Secret
          </InputGroupAddon>
          <Password v-model="twitchClientSecret" :feedback="false" toggleMask/>
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
          <Password v-model="twitchCode" :feedback="false" disabled toggleMask/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Access Token
          </InputGroupAddon>
          <Password v-model="twitchAccessToken" :feedback="false" disabled toggleMask/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Refresh Token
          </InputGroupAddon>
          <Password v-model="twitchRefreshToken" :feedback="false" disabled toggleMask/>
        </InputGroup>
        <div class="flex gap-3" style="flex-wrap: wrap;">
          <Button icon="pi pi-play" label="Step 1. 取得授權" severity="success" @click="twitch.getTwitchCode()"/>
          <Button icon="pi pi-play" label="Step 2. 取得 Access Token" severity="success"
                  @click="twitch.getTwitchAccessToken()"/>
          <Button icon="pi pi-play" label="Step 3. 更新憑證" severity="success"
                  @click="twitch.getTwitchRefreshToken()"/>
        </div>
      </div>
    </Fieldset>
  </div>
</template>

<style lang="scss" scoped>
#Chat-Setting {
  .testText {
    display: flex;
    justify-content: space-between;
  }

  .voicemodel {
    height: 40px;
  }
}
</style>
