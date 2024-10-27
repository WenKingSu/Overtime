import {defineStore} from "pinia";
import {StorageSerializers, useLocalStorage} from '@vueuse/core'
import settingJson from "assets/json/setting.json"

export const useChatSettingStore = defineStore("ChatSettingStore", () => {

    //Twitch
    const twitchChannelInfo = useLocalStorage(
        'twitchChannelInfo',
        localStorage.getItem('twitchChannelInfo') ? localStorage.getItem('twitchChannelInfo') : null,
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
        localStorage.getItem('twitchBroadcasterId') ? localStorage.getItem('twitchBroadcasterId') : settingJson.chat.twitch.broadcasterId,
        {mergeDefaults: true}
    )
    const twitchActive = useLocalStorage(
        'twitchActive',
        localStorage.getItem('twitchActive') ? localStorage.getItem('twitchActive') : settingJson.chat.twitch.active,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.boolean
        }
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
    const youtubeActive = useLocalStorage(
        'youtubeActive',
        localStorage.getItem('youtubeActive') ? localStorage.getItem('youtubeActive') : settingJson.chat.youtube.active,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.boolean
        }
    )
    const youtubeMessages = ref([])

    //Global
    const messages = ref([])
    const filterPrefix = useLocalStorage(
        'filterPrefix',
        localStorage.getItem('filterPrefix') ? localStorage.getItem('filterPrefix') : settingJson.chat.filterPrefix,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.object
        }
    )
    const blockUsers = useLocalStorage(
        'blockUsers',
        localStorage.getItem('blockUsers') ? localStorage.getItem('blockUsers') : settingJson.chat.blockUsers,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.object
        }
    )

    return {
        twitchActive,
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
        youtubeActive,
        youtubeToken,
        youtubeVideoId,
        youtubeMessages,
        youtubeRefreshTime,
        messages,
        filterPrefix,
        blockUsers
    }
})
