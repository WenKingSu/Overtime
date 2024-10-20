<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
import {useSpeakSettingStore} from "~/store/speakSettingStore";
import {useTwitch} from "~/composables/useTwitch";
import {useSpeak} from "~/composables/useSpeak";

const chatSettingStore = useChatSettingStore()
const {
  twitchClientId,
  twitchClientSecret,
  twitchChannel,
  twitchRefreshToken,
  twitchAccessToken,
  twitchCode,
  youtubeToken,
  youtubeVideoId,
  youtubeRefreshTime
} = storeToRefs(chatSettingStore)

const speakSettingStore = useSpeakSettingStore()
const {
  rate,
  pitch,
  voice
} = storeToRefs(speakSettingStore)

const twitch = useTwitch()
const speaker = useSpeak()

const synth = ref()
const voices = ref([]);

const populateVoiceList = () => {
  voices.value = synth.value
      .getVoices()
      .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));

  // console.log('voices清單', voices.value);
  if (!voice.value && voices.value.length > 0) {
    voice.value = voices.value.filter(i => i.default == true)[0].name;
  }
};

onBeforeMount(async () => {
  synth.value = window.speechSynthesis
  await nextTick()
})

onMounted(() => {
  if (synth.value.onvoiceschanged !== undefined) {
    synth.value = window.speechSynthesis;
    synth.value.onvoiceschanged = populateVoiceList
    console.log('SpeechSynthesis is supported.');
  } else {
    console.log('SpeechSynthesis is not supported.');
  }
});

</script>

<template>
  <div id="Chat-Setting">
    <Fieldset legend="語音設定" class="w-full">
      <InputGroup>
        <InputGroupAddon class="w-8rem" style="justify-content: left">
          語速
        </InputGroupAddon>
        <InputText v-model="rate" disabled/>
      </InputGroup>
      <Slider v-model="rate" :min="0.5" :max="2" :step="0.1" class="my-5"/>
      <InputGroup>
        <InputGroupAddon class="w-8rem" style="justify-content: left">
          音調
        </InputGroupAddon>
        <InputText v-model="pitch" disabled/>
      </InputGroup>
      <Slider v-model="pitch" :min="0" :max="2" :step="0.1" class="my-5"/>
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
                >
                  <template #value="slotProps">
                    {{ slotProps.value }}
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <div>{{ slotProps.option.name }} ( {{ slotProps.option.lang }} )</div>
                    </div>
                  </template>
                </Select>
      </InputGroup>
    </Fieldset>


    <Fieldset legend="Youtube設定" class="w-full">
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
            Code
          </InputGroupAddon>
          <InputText v-model="twitchCode"/>
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
