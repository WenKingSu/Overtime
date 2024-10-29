import {useChatSettingStore} from "~/store/chatSettingStore.js";
import {useSpeakSettingStore} from "~/store/speakSettingStore.js";

export const useTwitch = () => {
    const chatSettingStore = useChatSettingStore()
    const {
        twitchChannelInfo,
        twitchClientId,
        twitchClientSecret,
        twitchChannel,
        twitchRefreshToken,
        twitchAccessToken,
        twitchBroadcasterId,
        twitchCode,
        twitchBadges,
        twitchMessages,
        messages,
        blockUsers,
        filterPrefix
    } = storeToRefs(chatSettingStore)
    const speakSettingStore = useSpeakSettingStore()
    const {queue} = storeToRefs(speakSettingStore)


    const stringUtils = useStringUtils()

    // const host = `http://${encodeURIComponent(useRequestURL().hostname)}`
    // const twitchCodeUrl = `http://${encodeURIComponent(useRequestURL().host)}/getTwitchCode`
    const host = `https://overtime.0xwen.site`
    const twitchCodeUrl = `https://overtime.0xwen.site/getTwitchCode`
    const twitchAuthUrl = "https://id.twitch.tv/oauth2/token"
    const twitchApi = 'https://api.twitch.tv'
    const twitchChannelInfoUrl = '/helix/users?login='
    const twitchBadgeUrl = '/helix/chat/badges/global'
    const twitchChatBadgeUrl = '/helix/chat/badges?broadcaster_id='
    let ws;

    const getTwitchCode = async () => {
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId.value}&redirect_uri=${twitchCodeUrl}&response_type=code&scope=chat:read chat:edit channel:manage:vips&state=${twitchChannel.value}`
        await navigateTo(url, {
            open: {
                target: '_blank',
                windowFeatures: {
                    width: 800,
                    height: 800
                }
            }
        })
        await getTwitchBroadcasterId()
        await getTwitchAccessToken()
    }

    const getTwitchBroadcasterId = async () => {
        const url = `${twitchApi}${twitchChannelInfoUrl}${twitchChannel.value}`
        try {
            const response = await $fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + twitchAccessToken.value,
                    'Client-ID': twitchClientId.value,
                },
            })
            if (response) {
                twitchChannelInfo.value = response['data'][0]
                twitchBroadcasterId.value = twitchChannelInfo.value['id']
            }
        } catch (error) {
            console.error('Error:', error)
        }
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

    const fetchBadges = async () => {
        let url = `${twitchApi}${twitchBadgeUrl}`
        const headers = {
            "Authorization": `Bearer ${twitchAccessToken.value}`,
            "Client-Id": twitchClientId.value,
        }
        // Badges of Global
        let response = await useFetch(url, {headers: headers})
        if (response.data.value) {
            for (const item of response.data.value.data) {
                const badgeItems = {}
                const badgeType = item['set_id']
                for (const version of item['versions']) {
                    const id = version['id']
                    badgeItems[id] = version
                }
                twitchBadges.value[badgeType] = badgeItems
            }
        }
        // Badges of Chat custom.
        url = `${twitchApi}${twitchChatBadgeUrl}${twitchBroadcasterId.value}`
        response = await useFetch(url, {headers: headers})
        const badgeTypes = Object.keys(twitchBadges.value)
        if (response.data.value) {
            for (const item of response.data.value.data) {
                const badgeType = item['set_id']
                if (badgeTypes.includes(badgeType)) {
                    const badgeItems = twitchBadges.value[badgeType]
                    for (const version of item['versions']) {
                        const id = version['id']
                        badgeItems[id] = toRaw(version)
                    }
                } else {
                    const badgeItems = {}
                    for (const version of item['versions']) {
                        const id = version['id']
                        badgeItems[id] = toRaw(version)
                    }
                    twitchBadges.value[badgeType] = badgeItems
                }
            }
        }
    }

    const fetchBadgeUrl = (badgeItem) => {
        try {
            const badgeType = badgeItem[0]
            const badgeVersion = badgeItem[1]
            const badge = toRaw(twitchBadges.value[badgeType][badgeVersion])
            if (!!badge['image_url_1x']) {
                return badge['image_url_1x']
            }
        } catch (error) {
            const badgeType = badgeItem[0]
            const badgeVersion = badgeItem[1]
            const badge = toRaw(twitchBadges.value[badgeType][badgeVersion])
            console.log('twitchBadges', twitchBadges)
            console.log('badgeItem', badgeItem)
            console.log('badge', badge)
        }
        return null
    }


    const connectTwitchWebSocket = () => {
        ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

        ws.onopen = () => {
            const oauthToken = `oauth:${twitchAccessToken.value}`; // 替换为您的OAuth令牌
            // const username = twitchChannel.value;     // 替换为您的Twitch用户名
            const username = 'wenkingsu';     // 替换为您的Twitch用户名
            const channel = twitchChannel.value;        // 替换为您想加入的频道名

            // 发送身份验证和加入频道的消息
            ws.send(`CAP REQ :twitch.tv/tags twitch.tv/commands`);
            ws.send(`PASS ${oauthToken}`);
            ws.send(`NICK ${username}`);
            ws.send(`JOIN #${channel}`);
            console.log('Connected to Twitch IRC');
        };

        ws.onmessage = (event) => {
            const messageItem = stringUtils.parseTwitchMessage(event.data);
            if (messageItem) {
                messageItem.displayName = messageItem['tags']['display-name'];
                messageItem.badges = stringUtils.parseTwitchBadges(messageItem['tags']['badges']);
                messageItem.id = stringUtils.buildChatId(new Date(), messageItem.displayName)
                messages.value.push(messageItem);
                twitchMessages.value.push(messageItem);
                speakSettingStore.addSpeechQueue(blockUsers.value, filterPrefix.value, messageItem.displayName, messageItem.content);
                console.log('queue', queue.value)
            }
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    const disconnectTwitchWebSocket = () => {
        if (ws) {
            ws.close();
        }
    }


    return {
        connectTwitchWebSocket,
        disconnectTwitchWebSocket,
        getTwitchCode,
        getTwitchAccessToken,
        getTwitchRefreshToken,
        fetchBadgeUrl,
        fetchBadges,
        fetchDisplayName
    }
}
