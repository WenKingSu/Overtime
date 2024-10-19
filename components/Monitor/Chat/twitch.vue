<script lang="ts" setup>

import {useChatSettingStore} from "~/store/chatSettingStore";

const chatSettingStore = useChatSettingStore()
const {
  twitchChannel,
  twitchAccessToken,
} = storeToRefs(chatSettingStore)

const twitch = useTwitch()

const messages = ref([]);
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

    // 将消息添加到messages数组
    messages.value.push({
          id: Date.now(),
          displayName: displayName,
          content: content
        }
    )
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
        v-for="msg in messages"
        :key="msg.id"
        class="my-2"
    >
      {{ msg.displayName }}: {{ msg.content }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Monitor-Chat-Twitch {
}
</style>
