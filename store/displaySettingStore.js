import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useStorage} from "@vueuse/core";

export const useDisplaySettingStore = defineStore("DisplaySetting", () => {

    let clockFont = ref('GenSenRounded-B')
    let clockFontSize = ref(36)
    let bgColor = ref('00b140')
    let remainingTimeColor = ref('C1CB15')
    let elapsedTimeColor = ref('3FC21B')

    onMounted(() => {
        clockFont = useStorage(
            'clockFont',
            localStorage.getItem('clockFont') ? localStorage.getItem('clockFont') : settingJson.display.clockFont,
            localStorage,
            {mergeDefaults: true}
        )

        clockFontSize = useStorage(
            'clockFontSize',
            localStorage.getItem('clockFontSize') ? localStorage.getItem('clockFontSize') : settingJson.display.clockFontSize,
            localStorage,
            {mergeDefaults: true}
        )

        bgColor = useStorage(
            'bgColor',
            localStorage.getItem('bgColor') ? localStorage.getItem('bgColor') : settingJson.display.bgColor,
            localStorage,
            {mergeDefaults: true}
        )

        remainingTimeColor = useStorage(
            'remainingTimeColor',
            localStorage.getItem('remainingTimeColor') ? localStorage.getItem('remainingTimeColor') : settingJson.display.remainingTimeColor,
            localStorage,
            {mergeDefaults: true}
        )

        elapsedTimeColor = useStorage(
            'elapsedTimeColor',
            localStorage.getItem('elapsedTimeColor') ? localStorage.getItem('elapsedTimeColor') : settingJson.display.elapsedTimeColor,
            localStorage,
            {mergeDefaults: true}
        )
    })

    return {
        clockFont,
        clockFontSize,
        bgColor,
        remainingTimeColor,
        elapsedTimeColor
    }
})
