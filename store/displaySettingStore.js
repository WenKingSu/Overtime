import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {StorageSerializers, useLocalStorage} from "@vueuse/core";

export const useDisplaySettingStore = defineStore("DisplaySetting", () => {

    const clockFont = useLocalStorage(
        'clockFont',
        localStorage.getItem('clockFont') ? localStorage.getItem('clockFont') : settingJson.display.clockFont,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.string
        }
    )
    const clockFontSize = useLocalStorage(
        'clockFontSize',
        localStorage.getItem('clockFontSize') ? parseInt(localStorage.getItem('clockFontSize')) : settingJson.display.clockFontSize,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.number
        }
    )
    const clockBorderColor = useLocalStorage(
        'clockBorderColor',
        localStorage.getItem('clockBorderColor') ? localStorage.getItem('clockBorderColor') : settingJson.display.clockBorderColor,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.string
        }
    )
    const clockBorderSize = useLocalStorage(
        'clockBorderSize',
        localStorage.getItem('clockBorderSize') ? parseInt(localStorage.getItem('clockBorderSize')) : settingJson.display.clockBorderSize,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.number
        }
    )
    const bgColor = useLocalStorage(
        'bgColor',
        localStorage.getItem('bgColor') ? localStorage.getItem('bgColor') : settingJson.display.bgColor,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.string
        }
    )
    const remainingTimeColor = useLocalStorage(
        'remainingTimeColor',
        localStorage.getItem('remainingTimeColor') ? localStorage.getItem('remainingTimeColor') : settingJson.display.remainingTimeColor,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.string
        }
    )
    const elapsedTimeColor = useLocalStorage(
        'elapsedTimeColor',
        localStorage.getItem('elapsedTimeColor') ? localStorage.getItem('elapsedTimeColor') : settingJson.display.elapsedTimeColor,
        {
            mergeDefaults: true,
            serializer: StorageSerializers.string
        }
    )

    return {
        clockFont,
        clockFontSize,
        bgColor,
        clockBorderColor,
        clockBorderSize,
        remainingTimeColor,
        elapsedTimeColor
    }
})
