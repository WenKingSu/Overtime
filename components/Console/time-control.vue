<script lang="ts" setup>
const hour = ref(0)
const min = ref(0)
const sec = ref(0)

const plus1 = ref(0)
const plus2 = ref(0)
const plus3 = ref(0)
const plus4 = ref(0)
const plus5 = ref(0)

const money = ref(0)
const tranMin = ref(0)
const donate = ref(0)
const calcTime = ref(0)

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
            <InputNumber v-model="hour" placeholder="Hour"/>
            <InputGroupAddon>小時</InputGroupAddon>
            <InputNumber v-model="min" placeholder="Minute"/>
            <InputGroupAddon>分鐘</InputGroupAddon>
            <InputNumber v-model="sec" placeholder="Second"/>
            <InputGroupAddon>秒</InputGroupAddon>
          </InputGroup>
          <InputGroup class="main">
            <InputGroupAddon>
              已過時間
            </InputGroupAddon>
            <InputNumber v-model="hour" placeholder="Hour" disabled/>
            <InputGroupAddon>小時</InputGroupAddon>
            <InputNumber v-model="min" placeholder="Minute" disabled/>
            <InputGroupAddon>分鐘</InputGroupAddon>
            <InputNumber v-model="sec" placeholder="Second" disabled/>
            <InputGroupAddon>秒</InputGroupAddon>
          </InputGroup>
        </div>
        <Button label="開始" icon="pi pi-play" severity="success"/>
        <Button label="暫停" icon="pi pi-stop" severity="danger"/>
        <Button label="重設" icon="pi pi-sync" severity="warn"/>
      </div>
    </Fieldset>

    <Fieldset legend="快速加時" class="w-full">
      <div class="flex justify-around gap-x-3">
        <InputGroup class="fast">
          <InputNumber v-model="plus1" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus2" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus3" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus4" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn"/>
        </InputGroup>
        <InputGroup class="fast">
          <InputNumber v-model="plus5" placeholder="0"/>
          <InputGroupAddon>分鐘</InputGroupAddon>
          <Button icon="pi pi-plus" severity="warn"/>
        </InputGroup>
      </div>
    </Fieldset>

    <Fieldset legend="金額換算加時" class="w-full">
      <div class="flex justify-around gap-x-3">
        <InputGroup class="custom">
          <InputGroupAddon>
            設定
          </InputGroupAddon>
          <InputNumber v-model="money" placeholder="0"/>
          <InputGroupAddon>
            <i class="pi pi-dollar"></i>
          </InputGroupAddon>
          <InputGroupAddon>
            <i class="pi pi-angle-right"></i>
          </InputGroupAddon>
          <InputNumber v-model="tranMin" placeholder="0"/>
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
          <Button icon="pi pi-check" severity="success"/>
        </InputGroup>
      </div>
    </Fieldset>
  </div>
</template>

<style lang="scss" scoped>
#Time-Control {
}

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
</style>
