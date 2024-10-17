import {defineStore} from "pinia";
import settingJson from "assets/json/setting.json"

export const useClockSettingStore = defineStore("ClockSettingStore", () => {

    const run = ref(false)

    const remainingTime = ref(settingJson.clock.remainingTime)
    const elapsedTime = ref(settingJson.clock.elapsedTime)
    //加時設定
    const plus1 = ref(settingJson.clock.plus1)
    const plus2 = ref(settingJson.clock.plus2)
    const plus3 = ref(settingJson.clock.plus3)
    const plus4 = ref(settingJson.clock.plus4)
    const plus5 = ref(settingJson.clock.plus5)

    //金額換算時間
    const transDonateUnit = ref(settingJson.clock.transDonateUnit)
    const transTimeUnit = ref(settingJson.clock.transTimeUnit)

    // 剩餘時間
    const remainingHour = ref(parseInt(remainingTime.value.split(":")[0]))
    const remainingMinutes = ref(parseInt(remainingTime.value.split(":")[1]))
    const remainingSecond = ref(parseInt(remainingTime.value.split(":")[2]))

    // 經過時間
    const elapsedHour = ref(parseInt(elapsedTime.value.split(":")[0]))
    const elapsedMinutes = ref(parseInt(elapsedTime.value.split(":")[1]))
    const elapsedSecond = ref(parseInt(elapsedTime.value.split(":")[2]))

    const plusMinutes = (minutes) => {
        const value = remainingMinutes.value + minutes
        if (value > 60) {
            remainingHour.value += value / 60
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
