import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useLocalStorage} from "@vueuse/core";

export const useDisplaySettingStore = defineStore("DisplaySetting", () => {

    const clockFont = useLocalStorage(
        'clockFont',
        localStorage.getItem('clockFont') ? localStorage.getItem('clockFont') : settingJson.display.clockFont,
        {mergeDefaults: true}
    )
    const clockFontSize = useLocalStorage(
        'clockFontSize',
        localStorage.getItem('clockFontSize') ? parseInt(localStorage.getItem('clockFontSize')) : settingJson.display.clockFontSize,
        {mergeDefaults: true}
    )
    const bgColor = useLocalStorage(
        'bgColor',
        localStorage.getItem('bgColor') ? localStorage.getItem('bgColor') : settingJson.display.bgColor,
        {mergeDefaults: true}
    )
    const remainingTimeColor = useLocalStorage(
        'remainingTimeColor',
        localStorage.getItem('remainingTimeColor') ? localStorage.getItem('remainingTimeColor') : settingJson.display.remainingTimeColor,
        {mergeDefaults: true}
    )
    const elapsedTimeColor = useLocalStorage(
        'elapsedTimeColor',
        localStorage.getItem('elapsedTimeColor') ? localStorage.getItem('elapsedTimeColor') : settingJson.display.elapsedTimeColor,
        {mergeDefaults: true}
    )

    return {
        clockFont,
        clockFontSize,
        bgColor,
        remainingTimeColor,
        elapsedTimeColor
    }
})
