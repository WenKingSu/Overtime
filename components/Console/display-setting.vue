<script lang="ts" setup>
import {useDisplayStore} from "~/store/displayStore";

const displayStore = useDisplayStore();
const {bgColor} = storeToRefs(displayStore)

const files = import.meta.glob("@/assets/fonts/*");
const selectedFont = ref();
const fontOptions = computed(() => {
  const options = []
  for (const path of Object.keys(files)) {
    const split = path.split('/')
    const name = split[split.length - 1]
    options.push({name: name, value: name})
  }
  return options
})
const setClockFont = () => {
  console.log(selectedFont.value)
}

const setBgColor = () => {
  displayStore.setBgColor(bgColor.value)
}
</script>

<template>
  <div id="Display-Setting">

    <Fieldset legend="時間字型設定" class="w-full">
      <div class="flex justify-between gap-3">
        <div class="grow-1">
          <InputGroup class="clock-font">
            <InputGroupAddon>
              時間字型
            </InputGroupAddon>
            <Select v-model="selectedFont"
                    :options="fontOptions"
                    optionLabel="name"
                    placeholder="時間字型"
                    checkmark
                    :highlightOnSelect="false"
                    class="w-full md:w-56"
            />
          </InputGroup>
        </div>
        <Button label="設定" icon="pi pi-cog" severity="success" @click="setClockFont"/>
      </div>
    </Fieldset>

    <Fieldset legend="顯示背景顏色" class="w-full">
      <div class="flex justify-between gap-3">
        <div class="grow-1">
          <InputGroup class="clock-font">
            <InputGroupAddon>
              顏色
            </InputGroupAddon>
            <InputText v-model="bgColor"/>
            <ColorPicker v-model="bgColor" format="hex" inline/>
          </InputGroup>
        </div>
      </div>
    </Fieldset>

  </div>
</template>

<style lang="scss" scoped>
#Display-Setting {
}
</style>
