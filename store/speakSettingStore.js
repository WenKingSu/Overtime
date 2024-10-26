import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useLocalStorage} from "@vueuse/core";

export const useSpeakSettingStore = defineStore("SpeakSettingStore", () => {

    const synth = ref()
    const voices = ref([])
    const rate = useLocalStorage(
        'rate',
        localStorage.getItem('rate') ? parseFloat(localStorage.getItem('rate')) : settingJson.chat.speak.rate,
        {mergeDefaults: true}
    )
    const pitch = useLocalStorage(
        'pitch',
        localStorage.getItem('pitch') ? parseFloat(localStorage.getItem('pitch')) : settingJson.chat.speak.pitch,
        {mergeDefaults: true}
    )
    const voice = useLocalStorage(
        'voice',
        localStorage.getItem('voice') ? localStorage.getItem('voice') : settingJson.chat.speak.voice,
        {mergeDefaults: true}
    )
    const queue = ref([])

    const addSpeechQueue = (blockUsers, filterMessages, displayName, message) => {
        if (blockUsers.includes(displayName)) {
            return
        }
        for (const prefix of filterMessages) {
            if (message.startsWith(prefix)) {
                return
            }
        }
        queue.value.push(message);
    }

    return {
        synth,
        voices,
        rate,
        pitch,
        voice,
        queue,
        addSpeechQueue
    }
})
