import {defineStore} from "pinia";
import defaultJson from "assets/json/defaultSetting.json"

export const useDefaultStore = defineStore("Default", () => {

    const clockFont = ref(defaultJson.displayClockFont)
    const startTime = ref(defaultJson.startTime)

    return {
        clockFont,
        startTime,
    }
})
