import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"

export const useDisplaySettingStore = defineStore("DisplaySetting", () => {

    const clockFont = ref(settingJson.display.clockFont)
    const clockFontSize = ref(settingJson.display.clockFontSize)
    const bgColor = ref(settingJson.display.bgColor)
    const remainingTimeColor = ref(settingJson.display.remainingTimeColor)
    const elapsedTimeColor = ref(settingJson.display.elapsedTimeColor)

    const setBgColor = (targetColor) => {
        if (targetColor) {
            bgColor.value = targetColor
        }
    }

    return {
        clockFont,
        clockFontSize,
        bgColor,
        setBgColor,
        remainingTimeColor,
        elapsedTimeColor
    }
})
