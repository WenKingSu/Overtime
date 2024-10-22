import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useLocalStorage} from "@vueuse/core";

export const useClockSettingStore = defineStore("ClockSettingStore", () => {

    const run = ref(false)

    const remainingTime = useLocalStorage(
        'remainingTime',
        localStorage.getItem('remainingTime') ? localStorage.getItem('remainingTime') : settingJson.clock.remainingTime,
        {mergeDefaults: true}
    )
    const elapsedTime = useLocalStorage(
        'elapsedTime',
        localStorage.getItem('elapsedTime') ? localStorage.getItem('elapsedTime') : settingJson.clock.elapsedTime,
        {mergeDefaults: true}
    )
    //加時設定
    const plus1 = useLocalStorage(
        'plus1',
        localStorage.getItem('plus1') ? parseInt(localStorage.getItem('plus1')) : settingJson.clock.plus1,
        {mergeDefaults: true}
    )
    const plus2 = useLocalStorage(
        'plus2',
        localStorage.getItem('plus2') ? parseInt(localStorage.getItem('plus2')) : settingJson.clock.plus2,
        {mergeDefaults: true}
    )
    const plus3 = useLocalStorage(
        'plus3',
        localStorage.getItem('plus3') ? parseInt(localStorage.getItem('plus3')) : settingJson.clock.plus3,
        {mergeDefaults: true}
    )
    const plus4 = useLocalStorage(
        'plus4',
        localStorage.getItem('plus4') ? parseInt(localStorage.getItem('plus4')) : settingJson.clock.plus4,
        {mergeDefaults: true}
    )
    const plus5 = useLocalStorage(
        'plus5',
        localStorage.getItem('plus5') ? parseInt(localStorage.getItem('plus5')) : settingJson.clock.plus5,
        {mergeDefaults: true}
    )

    //金額換算時間
    const transDonateUnit = useLocalStorage(
        'transDonateUnit',
        localStorage.getItem('transDonateUnit') ? parseInt(localStorage.getItem('transDonateUnit')) : settingJson.clock.transDonateUnit,
        {mergeDefaults: true}
    )
    const transTimeUnit = useLocalStorage(
        'transTimeUnit',
        localStorage.getItem('transTimeUnit') ? parseInt(localStorage.getItem('transTimeUnit')) : settingJson.clock.transTimeUnit,
        {mergeDefaults: true}
    )

    // 剩餘時間
    let remainingHour = ref(parseInt(remainingTime.value.split(":")[0]))
    let remainingMinutes = ref(parseInt(remainingTime.value.split(":")[1]))
    let remainingSecond = ref(parseInt(remainingTime.value.split(":")[2]))

    // 經過時間
    const elapsedHour = ref(parseInt(elapsedTime.value.split(":")[0]))
    const elapsedMinutes = ref(parseInt(elapsedTime.value.split(":")[1]))
    const elapsedSecond = ref(parseInt(elapsedTime.value.split(":")[2]))

    const plusMinutes = (minutes) => {
        const value = remainingMinutes.value + minutes
        if (value >= 60) {
            remainingHour.value += value / 60
            remainingMinutes.value = value % 60
        } else {
            remainingMinutes.value = value % 60
        }
    }

    const minusSecond = () => {
        // 剩餘時間
        if (remainingHour.value > 0 ||
            remainingMinutes.value > 0 ||
            remainingSecond.value > 0
        ) {
            //時間尚未結束
            if (remainingSecond.value > 0) {
                remainingSecond.value -= 1
            } else {
                remainingSecond.value = 59
                if (remainingMinutes.value > 0) {
                    remainingMinutes.value -= 1
                } else {
                    if (remainingHour.value > 0) {
                        remainingHour.value -= 1
                        remainingMinutes.value = 59
                    }
                }
            }
        }

        // 經過時間
        if (elapsedSecond.value < 59) {
            elapsedSecond.value += 1
        } else {
            elapsedSecond.value = 0

            if (elapsedMinutes.value < 59) {
                elapsedMinutes.value += 1
            } else {
                elapsedMinutes.value = 0
                elapsedHour.value += 1
            }
        }
    }

    return {
        run,
        remainingTime,
        elapsedTime,
        plus1,
        plus2,
        plus3,
        plus4,
        plus5,
        transDonateUnit,
        transTimeUnit,
        remainingHour,
        remainingMinutes,
        remainingSecond,
        elapsedHour,
        elapsedMinutes,
        elapsedSecond,
        plusMinutes,
        minusSecond
    }
})
