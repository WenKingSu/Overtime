import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useStorage} from "@vueuse/core";

export const useSpeakSettingStore = defineStore("SpeakSettingStore", () => {

    const synth = ref()
    const voices = ref()
    let rate = ref(settingJson.chat.speak.rate)
    let pitch = ref(settingJson.chat.speak.pitch)
    let voice = ref(settingJson.chat.speak.voice)
    const queue = ref([])

    onMounted(() => {
        rate = useStorage(
            'rate',
            localStorage.getItem('rate') ? localStorage.getItem('rate') : settingJson.chat.speak.rate,
            localStorage,
            {mergeDefaults: true}
        )
        pitch = useStorage(
            'pitch',
            localStorage.getItem('pitch') ? localStorage.getItem('pitch') : settingJson.chat.speak.pitch,
            localStorage,
            {mergeDefaults: true}
        )
        voice = useStorage(
            'voice',
            localStorage.getItem('voice') ? localStorage.getItem('voice') : settingJson.chat.speak.voice,
            localStorage,
            {mergeDefaults: true}
        )
    })



    return {
        synth,
        voices,
        rate,
        pitch,
        voice,
        queue
    }
})
