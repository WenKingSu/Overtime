import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useLocalStorage} from "@vueuse/core";

export const useAnimateSettingStore = defineStore("AnimateSetting", () => {

    const animateTime = useLocalStorage(
        'animateTime',
        localStorage.getItem('animateTime') ? parseInt(localStorage.getItem('animateTime')) : settingJson.display.animateTime,
        {mergeDefaults: true}
    )
    const animateMoveRange = useLocalStorage(
        'animateMoveRange',
        localStorage.getItem('animateMoveRange') ? parseInt(localStorage.getItem('animateMoveRange')) : settingJson.display.animateMoveRange,
        {mergeDefaults: true}
    )

    return {
        animateTime,
        animateMoveRange
    }
})
