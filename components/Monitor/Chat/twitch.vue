<script lang="ts" setup>
import {useChatSettingStore} from "~/store/chatSettingStore";
import {useSpeakSettingStore} from "~/store/speakSettingStore";

const chatSettingStore = useChatSettingStore()
const {
  twitchChannel,
  twitchAccessToken,
  twitchMessages,
  messages
} = storeToRefs(chatSettingStore)
const speakSettingStore = useSpeakSettingStore()
const {
  queue
} = storeToRefs(speakSettingStore)

const stringUtils = useStringUtils()
const twitch = useTwitch()

const message = ref('');
let ws;

// 建立WebSocket连接
const connectWebSocket = () => {
  ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

  ws.onopen = () => {
    const oauthToken = `oauth:${twitchAccessToken.value}`; // 替换为您的OAuth令牌
    const username = 'wenkingsu';     // 替换为您的Twitch用户名
    const channel = twitchChannel.value;        // 替换为您想加入的频道名

    // 发送身份验证和加入频道的消息
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
    const senderInfo = message.split(' ')[0];
    const username = senderInfo.split('!')[0].substring(1);
    const displayName = await twitch.fetchDisplayName(username)
    const content = message.split('PRIVMSG')[1].split(':', 2)[1]

    const item = {
      id: stringUtils.buildChatId(Date.now(), displayName),
      channelType: "Twitch",
      displayName: displayName,
      content: content
    }
    // 将消息添加到messages数组

    const checkExist = messages.value.some(i => {
      return i.id === item.id && i.displayName === item.displayName
    });
    if (!checkExist) {
      twitchMessages.value.push({
        id: stringUtils.buildChatId(new Date(), displayName),
        channelType: "Twitch",
        displayName: displayName,
        content: content,
        contents: [{
          contentType: 'text',
          content: content
        }]
      })
      messages.value.push({
            id: stringUtils.buildChatId(new Date(), displayName),
            channelType: "Twitch",
            displayName: displayName,
            content: content,
            contents: [{
              contentType: 'text',
              content: content
            }]
          }
      )
      queue.value.push(content)
    }
  }
}

// 清理WebSocket连接
onBeforeUnmount(() => {
  if (ws) {
    ws.close();
  }
})

// 连接WebSocket
onMounted(() => {
  connectWebSocket()
})

</script>

<template>
  <div id="Monitor-Chat-Twitch" class="m-3">
    <div
        v-for="msg in twitchMessages"
        :key="msg.id"
        class="my-2"
    >
      <span>
        {{ msg.displayName }}
      </span>
      <span>
        ：
      </span>
      <template v-for="(item, index) of msg.contents" :key="index">
        <Image v-if="item.contentType === 'image'" :src="item.content.url" :width="item.content.width"
               :height="item.content.height"/>
        <span v-else>{{ item.content }}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Twitch {
}
</style>
