import {defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core'
import settingJson from "assets/json/setting.json"

export const useChatSettingStore = defineStore("ChatSettingStore", () => {

    //Twitch
    const twitchClientId = useLocalStorage(
        'twitchClientId',
        localStorage.getItem('twitchClientId') ? localStorage.getItem('twitchClientId') : settingJson.chat.twitch.clientId,
        localStorage,
        {mergeDefaults: true}
    )
    const twitchClientSecret= useLocalStorage(
        'twitchClientSecret',
        localStorage.getItem('twitchClientSecret') ? localStorage.getItem('twitchClientSecret') : settingJson.chat.twitch.clientSecret,
        {mergeDefaults: true}
    )
    const twitchChannel = useLocalStorage(
        'twitchChannel',
        localStorage.getItem('twitchChannel') ? localStorage.getItem('twitchChannel') : settingJson.chat.twitch.channel,
        {mergeDefaults: true}
    )
    const twitchAccessToken = useLocalStorage(
        'twitchAccessToken',
        localStorage.getItem('twitchAccessToken') ? localStorage.getItem('twitchAccessToken') : settingJson.chat.twitch.accessToken,
        {mergeDefaults: true}
    )
    const twitchRefreshToken = useLocalStorage(
        'twitchRefreshToken',
        localStorage.getItem('twitchRefreshToken') ? localStorage.getItem('twitchRefreshToken') : settingJson.chat.twitch.refreshToken,
        {mergeDefaults: true}
    )
    const twitchCode = useLocalStorage(
        'twitchCode',
        localStorage.getItem('twitchCode') ? localStorage.getItem('twitchCode') : settingJson.chat.twitch.code,
        {mergeDefaults: true}
    )
    const twitchMessages = ref([])

    //YouTube
    const youtubeToken = useLocalStorage(
        'youtubeToken',
        localStorage.getItem('youtubeToken') ? localStorage.getItem('youtubeToken') : settingJson.chat.youtube.token,
        {mergeDefaults: true}
    )
    const youtubeVideoId = useLocalStorage(
        'youtubeVideoId',
        localStorage.getItem('youtubeVideoId') ? localStorage.getItem('youtubeVideoId') : settingJson.chat.youtube.videoId,
        {mergeDefaults: true}
    )
    const youtubeRefreshTime = useLocalStorage(
        'youtubeRefreshTime',
        localStorage.getItem('youtubeRefreshTime') ? parseInt(localStorage.getItem('youtubeRefreshTime')) : settingJson.chat.youtube.refreshTime,
        {mergeDefaults: true}
    )
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
