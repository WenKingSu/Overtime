export const useStringUtils = () => {

    const buildChatId = (date, displayName) => {
        const formatted = useDateFormat(date, 'YYYY-MM-DD-HH-mm-ss')
        return `${formatted.value}${displayName}`
    }

    const parseTwitchMessage = (message) => {
        if (!message.includes('PRIVMSG')) {
            return;
        }

        const parsedMessage = {
            id: null,
            tags: {},
            prefix: null,
            command: null,
            params: [],
            displayName: "",
            content: "",
            contents: [],
            channelType: "Twitch",
        };

        let idx = 0;
        // 解析标签
        if (message[idx] === '@') {
            const endIdx = message.indexOf(' ');
            const rawTags = message.slice(1, endIdx).split(';');
            rawTags.forEach(tag => {
                const [key, value] = tag.split('=');
                parsedMessage.tags[key] = value || true;  // 没有值的标签默认设为 true
            });
            idx = endIdx + 1;
        }

        // 解析前缀
        if (message[idx] === ':') {
            const endIdx = message.indexOf(' ', idx);
            parsedMessage.prefix = message.slice(idx + 1, endIdx);
            idx = endIdx + 1;
        }

        // 解析命令
        const endIdx = message.indexOf(' ', idx);
        if (endIdx === -1) {
            parsedMessage.command = message.slice(idx);
            return parsedMessage;
        }

        parsedMessage.command = message.slice(idx, endIdx);
        idx = endIdx + 1;

        // 解析参数
        while (idx < message.length) {
            if (message[idx] === ':') {
                parsedMessage.params.push(message.slice(idx + 1));
                break;
            }

            const endIdx = message.indexOf(' ', idx);
            if (endIdx === -1) {
                parsedMessage.params.push(message.slice(idx));
                break;
            }
            parsedMessage.params.push(message.slice(idx, endIdx));
            idx = endIdx + 1;
        }

        const content = parsedMessage.params.slice(1).join("").replaceAll("\r\n", "")
        parsedMessage.contents = [{
            contentType: 'text',
            content: content
        }];

        return parsedMessage;
    }

    const parseTwitchBadges = (badges) => {
        if (!badges) return null
        const result = {}
        if (badges.includes(",")) {
            let split = badges.split(",")
            for (const badge of split) {
                split = badge.split("/")
                result[split[0]] = split[1]
            }
        } else {
            console.log(badges)
            const split = badges.split("/")
            console.log(split)
            result[split[0]] = split[1]
        }
        return result
    }

    return {
        buildChatId,
        parseTwitchMessage,
        parseTwitchBadges
    }
}
