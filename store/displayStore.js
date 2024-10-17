import {defineStore} from "pinia";

export const useDisplayStore = defineStore("Display", () => {

    const bgColor = ref('00b140')

    const setBgColor = (targetColor) => {
        if (targetColor) {
            bgColor.value = targetColor
        }
    }

    return {
        bgColor,
        setBgColor,
    }
})
