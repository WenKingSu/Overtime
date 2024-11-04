<script lang="ts" setup>
import {useClockSettingStore} from "~/store/clockSettingStore";

const clockSettingStore = useClockSettingStore()
const {
  run,
  addTimeQueue,
  plus1,
  plus2,
  plus3,
  plus4,
  plus5,
  transDonateUnit,
  transRate,
  transTimeUnit,
  remainingHour,
  remainingMinutes,
  remainingSecond,
  elapsedHour,
  elapsedMinutes,
  elapsedSecond,
} = storeToRefs(clockSettingStore)

const donate = ref(0)
const calcTime = computed(() => {
  if (donate.value) {
    return (donate.value / transDonateUnit.value) * transTimeUnit.value
  }
  return 0
})

const start = () => {
  run.value = true
}

const stop = () => {
  run.value = false
}

const plusMinutes = (value) => {
  clockSettingStore.plusMinutes(value)
  addTimeQueue.value.push(value)
}

</script>

<template>
  <div id="Time-Control" class="flex-y-center gap-y-3">
    <Fieldset legend="主要設定" class="w-full">
      <div class="flex justify-between gap-3">
        <div class="flex-y-center gap-y-3">
          <InputGroup class="main">
            <InputGroupAddon>
              剩餘時間
            </InputGroupAddon>
            <InputNumber v-model="remainingHour" class="main-rate" placeholder="Hour"/>
            <InputGroupAddon>小時</InputGroupAddon>
            <InputNumber v-model="remainingMinutes" placeholder="Minute"/>
            <InputGroupAddon>分鐘</InputGroupAddon>
            <InputNumber v-model="remainingSecond" placeholder="Second"/>
            <InputGroupAddon>秒</InputGroupAddon>
          </InputGroup>
          <InputGroup class="main">
            <InputGroupAddon>
              已過時間
            </InputGroupAddon>
            <InputNumber v-model="elapsedHour" class="main-rate" placeholder="Hour"/>
            <InputGroupAddon>小時</InputGroupAddon>
            <InputNumber v-model="elapsedMinutes" placeholder="Minute"/>
            <InputGroupAddon>分鐘</InputGroupAddon>
            <InputNumber v-model="elapsedSecond" placeholder="Second"/>
            <InputGroupAddon>秒</InputGroupAddon>
          </InputGroup>
        </div>
        <div class="flex gap-3 flex-center">
            <Button label="開始" icon="pi pi-play" severity="success" class="fixed-button" @click="start" :disabled="run"/>
            <Button label="暫停" icon="pi pi-stop" severity="danger" class="fixed-button" @click="stop" :disabled="!run"/>
        </div>
<!--        <Button label="重設" icon="pi pi-sync" severity="warn"/>-->
      </div>
    </Fieldset>

    <Fieldset legend="快速加時" class="w-full">
      <div class="flex justify-around gap-3">
        <InputGroup class="fast">
          <InputNumber v-model="plus1" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn" @click="plusMinutes(plus1)"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus2" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn" @click="plusMinutes(plus2)"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus3" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn" @click="plusMinutes(plus3)"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus4" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn" @click="plusMinutes(plus4)"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus5" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn" @click="plusMinutes(plus5)"/>
        </InputGroup>
      </div>
    </Fieldset>

    <Fieldset legend="金額換算加時" class="w-full">
      <div class="flex justify-between gap-3">
        <div class="flex-y-center gap-3">
          <InputGroup class="custom">
            <InputGroupAddon>
              設定
            </InputGroupAddon>
            <InputNumber v-model="transDonateUnit" class="custom-rate" placeholder="0"/>
            <InputGroupAddon>
              <i class="pi pi-dollar"></i>
            </InputGroupAddon>
            <InputGroupAddon>
              <i class="pi pi-angle-right"></i>
            </InputGroupAddon>
            <InputNumber v-model="transTimeUnit" placeholder="0"/>
            <InputGroupAddon>
              <i class="pi pi-clock"></i>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup class="donate">
            <InputGroupAddon>
              斗內金額
            </InputGroupAddon>
            <InputNumber v-model="donate" class="donate-rate" placeholder="0"/>
            <InputGroupAddon>
              <i class="pi pi-dollar"></i>
            </InputGroupAddon>
            <InputGroupAddon>
              <i class="pi pi-angle-right"></i>
            </InputGroupAddon>
            <InputNumber v-model="calcTime" class="donate2-rate" placeholder="0" disabled/>
            <InputGroupAddon>
              <i class="pi pi-clock"></i>
            </InputGroupAddon>
          </InputGroup>
        </div>
          <div class="flex-y-center gap-3 donate-trans">
          <InputGroup class="donate-trans">
            <InputGroupAddon>
              <i class="pi pi-times"></i>
            </InputGroupAddon>
            <InputNumber v-model="transRate" placeholder="1" />
            <InputGroupAddon>
              倍數
            </InputGroupAddon>
            <Button icon="pi pi-check" severity="success" @click="plusMinutes(calcTime * transRate)"/>
          </InputGroup>
        </div>
      </div>
    </Fieldset>

  </div>
</template>

<style lang="scss" scoped>
#Time-Control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .p-inputgroup {
    &.main {
      width: 380px;
    }

    &.fast {
      width: 10rem;
    }

    &.custom {
      width: 20rem;
    }

    &.donate {
      width: 25rem;
    }

    &.donate-trans {
      width: 12rem;
    }
  }

  .flex-y-center {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .flex {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .main-rate {
    width: 2rem;
  }

  .custom-rate {
    width: 2.5rem;
  }

  .donate-rate {
    width: 3rem;
  }

  .donate2-rate {
    width: 1.5rem;
  }

  .fixed-button {
    width: 5.5rem;
    height: 2.5rem;
  }

  .donate-trans {
    justify-content: flex-end;
  }

}
</style>