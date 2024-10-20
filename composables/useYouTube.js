import {useChatSettingStore} from "~/store/chatSettingStore.js";

export const useYouTube = () => {
    const chatSettingStore = useChatSettingStore()
    const {
        youtubeToken,
        youtubeVideoId,
        youtubeMessages
    } = storeToRefs(chatSettingStore)

    // const popoutUrl = `https://www.youtube.com/live_chat?is_popout=1&v=${youtubeVideoId.value}`
    const popoutUrl = `/youtube-api/live_chat?is_popout=1&v=${youtubeVideoId.value}`

    const fetchLiveChat = async () => {
        try {
            const chatHtml = ref('')
            // 通过代理请求 YouTube 数据
            // const response = await fetch(`/youtube-api/live_chat?v=${youtubeVideoId.value}`)
            const response = await fetch(popoutUrl)
            chatHtml.value = await response.text();
            extractChatMessages(chatHtml.value)
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    }

    const extractChatMessages = (html) => {
        youtubeMessages.value = []
        // 使用 DOMParser 解析 HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 假设聊天消息在某个特定的 class 中，例如 '.chat-message'
        const scriptTags = doc.querySelectorAll('script[nonce]'); // 替换为实际的选择器
        const json = JSON.parse(selectContentOfScriptTags(scriptTags))
        const contents = json['contents']
        const liveChatRenderer = contents['liveChatRenderer']
        const actions = liveChatRenderer['actions']
        for (let action of actions) {
            const item = extractMessage(action)
            if (item) {
                youtubeMessages.value.push(item)
            }
        }
    }

    const extractMessage = (action) => {
        if (action['addChatItemAction']) {
            const addChatItemAction = action['addChatItemAction']
            const item = addChatItemAction['item']
            if (item['liveChatTextMessageRenderer']) {
                const liveChatTextMessageRenderer = item['liveChatTextMessageRenderer']
                const runs = liveChatTextMessageRenderer['message']['runs']
                let content = ""
                for (let run of runs) {
                    if (run['emoji']) {
                        const imageUrl = run['emoji']['image']['thumbnails'][0]
                        content += `<Image src="${imageUrl.url}" alt="Image" />`
                    } else {
                        content += run['text']
                    }
                }
                return {
                    displayName: liveChatTextMessageRenderer['authorName']['simpleText'],
                    content: content
                }
            }
        }
    }

    const selectContentOfScriptTags = (tags) => {
        for (let script of tags) {
            const scriptContent = script.innerHTML;
            const match = scriptContent.match(/window\["ytInitialData"\]/);

            if (match) {
                return match.input.replace("window\[\"ytInitialData\"\] = ", "")
                    .replaceAll(";", "")
            }
        }
        return "{}"
    }

    return {
        fetchLiveChat,
    }
}
