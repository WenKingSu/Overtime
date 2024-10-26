import {defineStore} from "pinia";
import {useLocalStorage, StorageSerializers} from '@vueuse/core'
import settingJson from "assets/json/setting.json"

export const useChatSettingStore = defineStore("ChatSettingStore", () => {

    //Twitch
    const twitchChannelInfo = useLocalStorage(
        'twitchChannelInfo',
        localStorage.getItem('twitchChannelInfo') ? localStorage.getItem('twitchChannelInfo') : settingJson.chat.twitch.clientId,
        localStorage,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.object
        }
    )
    const twitchClientId = useLocalStorage(
        'twitchClientId',
        localStorage.getItem('twitchClientId') ? localStorage.getItem('twitchClientId') : settingJson.chat.twitch.clientId,
        localStorage,
        {mergeDefaults: true}
    )
    const twitchClientSecret = useLocalStorage(
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
    const twitchBroadcasterId = useLocalStorage(
        'twitchBroadcasterId',
        localStorage.getItem('twitchBroadcasterId') ? localStorage.getItem('twitchBroadcasterId') : settingJson.chat.twitch.code,
        {mergeDefaults: true}
    )
    const twitchBadges = ref({})
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

    const messages = ref([])

    return {
        twitchChannelInfo,
        twitchClientId,
        twitchClientSecret,
        twitchAccessToken,
        twitchRefreshToken,
        twitchChannel,
        twitchBroadcasterId,
        twitchBadges,
        twitchMessages,
        twitchCode,
        youtubeToken,
        youtubeVideoId,
        youtubeMessages,
        youtubeRefreshTime,
        messages
    }
})
