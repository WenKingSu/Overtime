import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useLocalStorage} from "@vueuse/core";

export const useClockSettingStore = defineStore("ClockSettingStore", () => {

    const run = ref(false)
    const addTimeQueue = ref([])

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
    const plus6 = useLocalStorage(
        'plus6',
        localStorage.getItem('plus6') ? parseInt(localStorage.getItem('plus6')) : settingJson.clock.plus6,
        {mergeDefaults: true}
    )

    //金額換算時間
    const transDonateUnit = useLocalStorage(
        'transDonateUnit',
        localStorage.getItem('transDonateUnit') ? parseInt(localStorage.getItem('transDonateUnit')) : settingJson.clock.transDonateUnit,
        {mergeDefaults: true}
    )
    const transRate = useLocalStorage(
        'transRate',
        localStorage.getItem('transRate') ? parseInt(localStorage.getItem('transRate')) : settingJson.clock.transRate,
        {mergeDefaults: true}
    )
    const transTimeUnit = useLocalStorage(
        'transTimeUnit',
        localStorage.getItem('transTimeUnit') ? parseInt(localStorage.getItem('transTimeUnit')) : settingJson.clock.transTimeUnit,
        {mergeDefaults: true}
    )

    // 剩餘時間
    let remainingHour = useLocalStorage(
        'remainingHour',
        localStorage.getItem('remainingHour') ? ref(parseInt(remainingTime.value.split(":")[0])) : 0,
        {mergeDefaults: true}
    )
    let remainingMinutes = useLocalStorage(
        'remainingMinutes',
        localStorage.getItem('remainingMinutes') ? ref(parseInt(remainingTime.value.split(":")[1])) : 0,
        {mergeDefaults: true}
    )
    let remainingSecond = useLocalStorage(
        'remainingSecond',
        localStorage.getItem('remainingSecond') ? ref(parseInt(remainingTime.value.split(":")[2])) : 0,
        {mergeDefaults: true}
    )

    // 經過時間
    const elapsedHour = useLocalStorage(
        'elapsedHour',
        localStorage.getItem('elapsedHour') ? ref(parseInt(elapsedTime.value.split(":")[0])) : 0,
        {mergeDefaults: true}
    )
    const elapsedMinutes = useLocalStorage(
        'elapsedMinutes',
        localStorage.getItem('elapsedMinutes') ? ref(parseInt(elapsedTime.value.split(":")[1])) : 0,
        {mergeDefaults: true}
    )
    const elapsedSecond = useLocalStorage(
        'elapsedSecond',
        localStorage.getItem('elapsedSecond') ? ref(parseInt(elapsedTime.value.split(":")[2])) : 0,
        {mergeDefaults: true}
    )

    const plusMinutes = (minutes) => {
        const value = remainingMinutes.value + minutes
        if (value >= 60) {
            remainingHour.value += Math.floor(value / 60)
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

        remainingTime.value = `${remainingHour.value}:${remainingMinutes.value}:${remainingSecond.value}`
        elapsedTime.value = `${elapsedHour.value}:${elapsedMinutes.value}:${elapsedSecond.value}`
    }

    return {
        run,
        addTimeQueue,
        remainingTime,
        elapsedTime,
        plus1,
        plus2,
        plus3,
        plus4,
        plus5,
        plus6,
        transDonateUnit,
        transRate,
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
