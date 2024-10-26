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
        twitchMessages,
        messages,
        queue
    } = storeToRefs(chatSettingStore)

    const stringUtils = useStringUtils()

    const host = `http://${encodeURIComponent(useRequestURL().hostname)}`
    const twitchCodeUrl = `http://${encodeURIComponent(useRequestURL().host)}/getTwitchCode`
    const twitchAuthUrl = "https://id.twitch.tv/oauth2/token"
    const twitchApi = 'https://api.twitch.tv'
    const twitchBadges = '/helix/chat/badges/global'
    let ws;
    const message = ref('')

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
        console.log('twitch data', data)
        return data[0]['display_name']
    }

    const fetchBadges = async () => {
        const url = `${twitchApi}${twitchBadges}`
        const headers = {
            "Authorization": `Bearer ${twitchAccessToken.value}`,
            "Client-Id": twitchClientId.value,
        }

        const {data} = await useFetch(url, {headers: headers})
        console.log('response.data', data.value)
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
            parseMessage(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };


// 解析消息
    const parseMessage = async (message) => {
        if (message.includes('PRIVMSG')) {
            console.log('message', message)
        }
        //     const senderInfo = message.split(' ')[0];
        //     const username = senderInfo.split('!')[0].substring(1);
        //     const displayName = await fetchDisplayName(username)
        //     const content = message.split('PRIVMSG')[1].split(':', 2)[1]
        //
        //     const item = {
        //         id: stringUtils.buildChatId(Date.now(), displayName),
        //         channelType: "Twitch",
        //         displayName: displayName,
        //         content: content
        //     }
        //     // 将消息添加到messages数组
        //
        //     const checkExist = messages.value.some(i => {
        //         return i.id === item.id && i.displayName === item.displayName
        //     });
        //
        //     if (!checkExist) {
        //         twitchMessages.value.push({
        //             id: stringUtils.buildChatId(new Date(), displayName),
        //             channelType: "Twitch",
        //             displayName: displayName,
        //             content: content,
        //             contents: [{
        //                 contentType: 'text',
        //                 content: content
        //             }]
        //         })
        //         messages.value.push({
        //                 id: stringUtils.buildChatId(new Date(), displayName),
        //                 channelType: "Twitch",
        //                 displayName: displayName,
        //                 content: content,
        //                 contents: [{
        //                     contentType: 'text',
        //                     content: content
        //                 }]
        //             }
        //         )
        //         queue.value.push(content)
        //     }
        // }
    }

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
        fetchBadges,
        fetchDisplayName
    }
}
