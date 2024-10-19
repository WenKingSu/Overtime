import {useChatSettingStore} from "~/store/chatSettingStore.js";

export const useTwitch = () => {
    const chatSettingStore = useChatSettingStore()
    const {
        twitchClientId,
        twitchClientSecret,
        twitchChannel,
        twitchRefreshToken,
        twitchAccessToken,
        twitchCode,
    } = storeToRefs(chatSettingStore)

    const host = `http://${encodeURIComponent(useRequestURL().hostname)}`
    const twitchAuthUrl = "https://id.twitch.tv/oauth2/token"

    const getTwitchCode = async () => {
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId.value}&redirect_uri=${host}&response_type=code&scope=chat:read chat:edit&state=${twitchChannel.value}`
        await navigateTo(url, {
            open: {
                target: '_blank',
                windowFeatures: {
                    width: 800,
                    height: 800
                }
            }
        })
    }

    const getTwitchAccessToken = async () => {
        const {data} = await useFetch(twitchAuthUrl, {
            method: 'post',
            body: {
                client_id: twitchClientId,
                client_secret: twitchClientSecret,
                grant_type: "authorization_code",
                code: twitchCode.value,
                redirect_uri: host
            }
        })
        if (data) {
            twitchAccessToken.value = data.value.access_token
            twitchRefreshToken.value = data.value.refresh_token
        }
    }

    const getTwitchRefreshToken = async () => {
        const {data} = await useFetch(twitchAuthUrl, {
            method: 'post',
            body: {
                client_id: twitchClientId,
                client_secret: twitchClientSecret,
                grant_type: "refresh_token",
                refresh_token: twitchRefreshToken.value
            }
        })

        if (data) {
            twitchAccessToken.value = data.value.access_token
            twitchRefreshToken.value = data.value.refresh_token
        }
    }

    const fetchDisplayName = async (id) => {
        const url = `https://api.twitch.tv/helix/users?login=${id}`
        const {data} = await useFetch(url, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${twitchAccessToken.value}`,
                'Client-ID': twitchClientId.value,
            }
        })

        return data.value.data[0]['display_name']
    }

    return {
        getTwitchCode,
        getTwitchAccessToken,
        getTwitchRefreshToken,
        fetchDisplayName
    }
}
