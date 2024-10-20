import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"

export const useSpeakSettingStore = defineStore("SpeakSettingStore", () => {

    const synth = ref()
    const voices = ref()
    const rate = ref(settingJson.chat.speak.rate)
    const pitch = ref(settingJson.chat.speak.pitch)
    const voice = ref(settingJson.chat.speak.voice)
    const queue = ref([])

    return {
        synth,
        voices,
        rate,
        pitch,
        voice,
        queue
    }
})
