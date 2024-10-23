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
    const twitchCodeUrl = `http://${encodeURIComponent(useRequestURL().host)}/getTwitchCode`
    const twitchAuthUrl = "https://id.twitch.tv/oauth2/token"

    const getTwitchCode = async () => {
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId.value}&redirect_uri=${twitchCodeUrl}&response_type=code&scope=chat:read chat:edit&state=${twitchChannel.value}`
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
        const postData = {
            client_id: twitchClientId.value,
            client_secret: twitchClientSecret.value,
            grant_type: "authorization_code",
            code: twitchCode.value,
            redirect_uri: host
        }
        try {
            const response = await $fetch(twitchAuthUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(postData),
            })
            if (response) {
                twitchAccessToken.value = response['access_token']
                twitchRefreshToken.value = response['refresh_token']
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const getTwitchRefreshToken = async () => {
        const postData = {
            client_id: twitchClientId.value,
            client_secret: twitchClientSecret.value,
            grant_type: "refresh_token",
            refresh_token: twitchRefreshToken.value
        }
        try {
            const response = await $fetch(twitchAuthUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(postData),
            })
            if (response) {
                twitchAccessToken.value = response['access_token']
                twitchRefreshToken.value = response['refresh_token']
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const fetchDisplayName = async (id) => {
        const url = `https://api.twitch.tv/helix/users?login=${id}`
        const {data} = await $fetch(url, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${twitchAccessToken.value}`,
                'Client-ID': twitchClientId.value,
            }
        })
        return data[0]['display_name']
    }

    return {
        getTwitchCode,
        getTwitchAccessToken,
        getTwitchRefreshToken,
        fetchDisplayName
    }
}
