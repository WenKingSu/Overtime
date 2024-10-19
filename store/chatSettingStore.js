import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"

export const useChatSettingStore = defineStore("ChatSettingStore", () => {

    //Twitch
    const twitchClientId = ref(settingJson.chat.twitch.client_id)
    const twitchClientSecret = ref(settingJson.chat.twitch.client_secret)
    const twitchChannel = ref(settingJson.chat.twitch.channel)
    const twitchAccessToken= ref(settingJson.chat.twitch.access_token)
    const twitchRefreshToken= ref(settingJson.chat.twitch.refresh_token)
    const twitchCode = ref(settingJson.chat.twitch.code)

    //YouTube
    const youtubeToken = ref(settingJson.chat.youtube.token)
    const youtubeVideoId = ref(settingJson.chat.youtube.videoId)


    return {
        twitchClientId,
        twitchClientSecret,
        twitchAccessToken,
        twitchRefreshToken,
        twitchChannel,
        twitchCode,
        youtubeToken,
        youtubeVideoId
    }
})
