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
      <div class="flex justify-between">
        <div class="flex-y-center gap-y-3">
          <InputGroup class="main">
            <InputGroupAddon>
              剩餘時間
            </InputGroupAddon>
            <InputNumber v-model="remainingHour" placeholder="Hour"/>
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
            <InputNumber v-model="elapsedHour" placeholder="Hour"/>
            <InputGroupAddon>小時</InputGroupAddon>
            <InputNumber v-model="elapsedMinutes" placeholder="Minute"/>
            <InputGroupAddon>分鐘</InputGroupAddon>
            <InputNumber v-model="elapsedSecond" placeholder="Second"/>
            <InputGroupAddon>秒</InputGroupAddon>
          </InputGroup>
        </div>
        <Button label="開始" icon="pi pi-play" severity="success" @click="start" :disabled="run"/>
        <Button label="暫停" icon="pi pi-stop" severity="danger" @click="stop" :disabled="!run"/>
<!--        <Button label="重設" icon="pi pi-sync" severity="warn"/>-->
      </div>
    </Fieldset>

    <Fieldset legend="快速加時" class="w-full">
      <div class="flex justify-around gap-x-3">
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
      <div class="flex justify-around gap-x-3">
        <InputGroup class="custom">
          <InputGroupAddon>
            設定
          </InputGroupAddon>
          <InputNumber v-model="transDonateUnit" placeholder="0"/>
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
            Donate金額
          </InputGroupAddon>
          <InputNumber v-model="donate" placeholder="0"/>
          <InputGroupAddon>
            <i class="pi pi-dollar"></i>
          </InputGroupAddon>
          <InputGroupAddon>
            <i class="pi pi-angle-right"></i>
          </InputGroupAddon>
          <InputNumber v-model="calcTime" placeholder="0" disabled/>
          <InputGroupAddon>
            <i class="pi pi-clock"></i>
          </InputGroupAddon>
          <Button icon="pi pi-check" severity="success" @click="plusMinutes(calcTime)"/>
        </InputGroup>
      </div>
    </Fieldset>

  </div>
</template>

<style lang="scss" scoped>
#Time-Control {
  .p-inputgroup {

    &.main {
      width: 30rem;
    }

    &.fast {
      width: 10rem;
    }

    &.custom {
      width: 20rem;
    }

    &.donate {
      width: 30rem;
    }
  }
}
</style>
