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
    const twitchMessages= ref([])

    //YouTube
    const youtubeToken = ref(settingJson.chat.youtube.token)
    const youtubeVideoId = ref(settingJson.chat.youtube.videoId)
    const youtubeRefreshTime= ref(settingJson.chat.youtube.refreshTime)
    const youtubeMessages = ref([])


    return {
        twitchClientId,
        twitchClientSecret,
        twitchAccessToken,
        twitchRefreshToken,
        twitchChannel,
        twitchMessages,
        twitchCode,
        youtubeToken,
        youtubeVideoId,
        youtubeMessages,
        youtubeRefreshTime
    }
})
