import {defineStore} from "pinia";
import defaultJson from "assets/json/defaultSetting.json"

export const useDisplayStore = defineStore("Display", () => {

    const clockFont = ref(defaultJson.displayClockFont)
    const bgColor = ref('00b140')

    const setBgColor = (targetColor) => {
        if (targetColor) {
            bgColor.value = targetColor
        }
    }

    return {
        clockFont,
        bgColor,
        setBgColor,
    }
})
