import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useStorage} from '@vueuse/core'

export const useChatSettingStore = defineStore("ChatSettingStore", () => {

    //Twitch
    let twitchClientId = ref('')
    let twitchClientSecret = ref('')
    let twitchChannel = ref('')
    let twitchAccessToken = ref('')
    let twitchRefreshToken = ref('')
    let twitchCode = ref('')
    let twitchMessages = ref([])

    //YouTube
    let youtubeToken = ref('')
    let youtubeVideoId = ref('')
    let youtubeRefreshTime = ref(5)
    let youtubeMessages = ref([])

    onMounted(() => {
        twitchClientId = useStorage(
            'twitchClientId',
            localStorage.getItem('twitchClientId') ? localStorage.getItem('twitchClientId') : settingJson.chat.twitch.client_id,
            localStorage,
            {mergeDefaults: true}
        )
        twitchClientSecret = useStorage(
            'twitchClientSecret',
            localStorage.getItem('twitchClientSecret') ? localStorage.getItem('twitchClientSecret') : settingJson.chat.twitch.client_secret,
            localStorage,
            {mergeDefaults: true}
        )
        twitchChannel = useStorage(
            'twitchChannel',
            localStorage.getItem('twitchChannel') ? localStorage.getItem('twitchChannel') : settingJson.chat.twitch.channel,
            localStorage,
            {mergeDefaults: true}
        )
        twitchAccessToken = useStorage(
            'twitchAccessToken',
            localStorage.getItem('twitchAccessToken') ? localStorage.getItem('twitchAccessToken') : settingJson.chat.twitch.access_token,
            localStorage,
            {mergeDefaults: true}
        )
        twitchCode = useStorage(
            'twitchAccessToken',
            localStorage.getItem('twitchAccessToken') ? localStorage.getItem('twitchAccessToken') : settingJson.chat.twitch.code,
            localStorage,
            {mergeDefaults: true}
        )

        youtubeToken = useStorage(
            'youtubeToken',
            localStorage.getItem('youtubeToken') ? localStorage.getItem('youtubeToken') : settingJson.chat.youtube.token,
            localStorage,
            {mergeDefaults: true}
        )
        youtubeVideoId = useStorage(
            'youtubeVideoId',
            localStorage.getItem('youtubeVideoId') ? localStorage.getItem('youtubeVideoId') : settingJson.chat.youtube.videoId,
            localStorage,
            {mergeDefaults: true}
        )
        youtubeRefreshTime = useStorage(
            'youtubeRefreshTime',
            localStorage.getItem('youtubeRefreshTime') ? parseInt(localStorage.getItem('youtubeRefreshTime')) : parseInt(settingJson.chat.youtube.refreshTime),
            localStorage,
            {mergeDefaults: true}
        )
    })

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
