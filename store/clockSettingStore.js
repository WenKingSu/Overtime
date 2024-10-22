import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"
import {useStorage} from "@vueuse/core";

export const useClockSettingStore = defineStore("ClockSettingStore", () => {

    const run = ref(false)

    let remainingTime = ref("300:00:00")
    let elapsedTime = ref("00:00:00")
    //加時設定
    let plus1 = ref(0)
    let plus2 = ref(0)
    let plus3 = ref(0)
    let plus4 = ref(0)
    let plus5 = ref(0)

    //金額換算時間
    let transDonateUnit = ref(1)
    let transTimeUnit = ref(1)

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

    onMounted(() => {
        remainingTime = useStorage(
            'remainingTime',
            localStorage.getItem('remainingTime') ? localStorage.getItem('remainingTime') : settingJson.clock.remainingTime,
            localStorage,
            {mergeDefaults: true}
        )

        elapsedTime = useStorage(
            'elapsedTime',
            localStorage.getItem('elapsedTime') ? localStorage.getItem('elapsedTime') : settingJson.clock.elapsedTime,
            localStorage,
            {mergeDefaults: true}
        )

        plus1 = useStorage(
            'plus1',
            localStorage.getItem('plus1') ? localStorage.getItem('plus1') : settingJson.clock.plus1,
            localStorage,
            {mergeDefaults: true}
        )

        plus2 = useStorage(
            'plus2',
            localStorage.getItem('plus2') ? localStorage.getItem('plus2') : settingJson.clock.plus2,
            localStorage,
            {mergeDefaults: true}
        )

        plus3 = useStorage(
            'plus3',
            localStorage.getItem('plus3') ? localStorage.getItem('plus3') : settingJson.clock.plus3,
            localStorage,
            {mergeDefaults: true}
        )

        plus4 = useStorage(
            'plus4',
            localStorage.getItem('plus4') ? localStorage.getItem('plus4') : settingJson.clock.plus4,
            localStorage,
            {mergeDefaults: true}
        )

        plus5 = useStorage(
            'plus5',
            localStorage.getItem('plus5') ? localStorage.getItem('plus5') : settingJson.clock.plus5,
            localStorage,
            {mergeDefaults: true}
        )

        transDonateUnit = useStorage(
            'transDonateUnit',
            localStorage.getItem('transDonateUnit') ? localStorage.getItem('transDonateUnit') : settingJson.clock.transDonateUnit,
            localStorage,
            {mergeDefaults: true}
        )

        transTimeUnit = useStorage(
            'transTimeUnit',
            localStorage.getItem('transTimeUnit') ? localStorage.getItem('transTimeUnit') : settingJson.clock.transTimeUnit,
            localStorage,
            {mergeDefaults: true}
        )
    })

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
