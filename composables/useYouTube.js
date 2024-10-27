import {useChatSettingStore} from "~/store/chatSettingStore.js";
import {useSpeakSettingStore} from "~/store/speakSettingStore.js";
import {useStringUtils} from "~/composables/useStringUtils.js";

export const useYouTube = () => {
    const chatSettingStore = useChatSettingStore()
    const {
        youtubeToken,
        youtubeVideoId,
        youtubeMessages,
        messages
    } = storeToRefs(chatSettingStore)

    const speakSettingStore = useSpeakSettingStore()
    const {
        queue
    } = storeToRefs(speakSettingStore)

    const stringUtils = useStringUtils()

    const fetchLiveChat = async () => {
        try {
            if (youtubeVideoId.value) {
                const chatHtml = ref('')
                // 通过代理请求 YouTube 数据
                const popoutUrl = `/youtube-api/live_chat?is_popout=1&v=${youtubeVideoId.value}`
                const response = await fetch(popoutUrl)
                chatHtml.value = await response.text();
                extractChatMessages(chatHtml.value)
            }
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
                const checkExist = messages.value.some(i => {
                    return i.id === item.id && i.displayName === item.displayName
                });
                if (item && !checkExist) {
                    youtubeMessages.value.push(item)
                    messages.value.push(item)
                    // queue.value.push(item.content)
                }
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
                let contents = []
                for (let run of runs) {
                    if (run['emoji']) {
                        const imageUrl = run['emoji']['image']['thumbnails'][0]
                        content += `<Image src="${imageUrl.url}" alt="Image" />`
                        contents.push({
                            contentType: 'image',
                            content: imageUrl
                        })
                    } else {
                        content += run['text']
                        contents.push({
                            contentType: 'text',
                            content: run['text']
                        })
                    }
                }
                const displayName = liveChatTextMessageRenderer['authorName']['simpleText']
                const id = stringUtils.buildChatId(parseTimestampToDate(liveChatTextMessageRenderer['timestampUsec']), displayName)
                return {
                    id: id,
                    channelType: "YouTube",
                    displayName: displayName,
                    content: content,
                    contents: contents
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

    const parseTimestampToDate = (timestamp) => {
        return new Date(parseInt(timestamp))
    }

    return {
        fetchLiveChat,
    }
}
