import {useChatSettingStore} from "~/store/chatSettingStore.js";

export const useYouTube = () => {
    const chatSettingStore = useChatSettingStore()
    const {
        youtubeToken,
        youtubeVideoId,
    } = storeToRefs(chatSettingStore)

    const popoutUrl = `https://www.youtube.com/live_chat?is_popout=1&v=${youtubeVideoId.value}`

    const fetchLiveChat = async () => {
        let response = await $fetch(popoutUrl);
        console.log('fetchLiveChat', response)

        // if (response.status === 200) {
        //     let data = await response.text();
        //     let data_obj = JSON.parse(data);
        //     let chat_array = [];
        //
        //     for (let i = 0; i < data_obj.length; i++) {
        //         let this_array = new Array();
        //         this_array["id"] = data_obj[i].id.slice(-64);
        //         this_array["name"] = data_obj[i].name;
        //         this_array["msg"] = data_obj[i].msg;
        //         this_array["ts"] = data_obj[i].ts;
        //         chat_array.push(this_array);
        //     }

        // displayChatItems(chat_array);
    }

    const displayChatItems = (chat_array) => {
        let chatbox = document.getElementById('chatbox');
        let len = chat_array.length;
        let current_li = [];
        let remove_count = 0;

        document.querySelectorAll(".chat-item").forEach(function (item) {
            current_li.push(item.getAttribute('data-attr'));
        });

        for (var i = 0; i < chat_array.length; i++) {
            const this_id = chat_array[i]["id"];
            const this_name = chat_array[i]["name"];
            const this_msg = chat_array[i]["msg"];
            const this_ts = chat_array[i]["ts"];

            if (!current_li.includes(this_id)) {
                chatbox.innerHTML += '<div data-attr="' + this_id + '" class="d-flex chat-item"><p><span class="user-name">' + this_name + ' : </span><span class="user-message">' + this_msg + '</span><br><i>' + this_ts + '</i></p></div>';
            }
        }

        if (remove_count != len) {
            for (var i = 0; i < remove_count; i++) {
                document.querySelector(".chat-item").remove();
            }
        }
    }
    return {
        fetchLiveChat,
        displayChatItems
    }
}
