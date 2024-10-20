<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
import {useTwitch} from "~/composables/useTwitch";

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

const twitch = useTwitch()

</script>

<template>
  <div id="Chat-Setting">

    <Fieldset legend="Youtube設定" class="w-full">
      <div class="flex flex-col justify-between gap-y-3">
        <InputGroup>
          <InputGroupAddon class="w-8rem" style="justify-content: left">
            Video ID
          </InputGroupAddon>
          <InputText v-model="youtubeVideoId"/>
        </InputGroup>
<!--        <InputGroup>-->
<!--          <InputGroupAddon class="w-8rem" style="justify-content: left">-->
<!--            Token-->
<!--          </InputGroupAddon>-->
<!--          <InputText v-model="youtubeToken"/>-->
<!--        </InputGroup>-->
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
        <Button label="Step 2. 取得Access Token" icon="pi pi-play" severity="success" @click="twitch.getTwitchAccessToken()"/>
        <Button label="Step 3. 更新憑證" icon="pi pi-play" severity="success" @click="twitch.getTwitchRefreshToken()"/>
      </div>
    </Fieldset>
  </div>
</template>

<style lang="scss" scoped>
#Chat-Setting {
}
</style>
