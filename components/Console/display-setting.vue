<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useFontStore} from "~/store/fontStore";
import {useAnimateSettingStore} from "~/store/animateSettingStore";

const displaySettingStore = useDisplaySettingStore();
const {
  bgColor,
  clockFont,
  clockFontSize,
  remainingTimeColor,
  elapsedTimeColor,
} = storeToRefs(displaySettingStore)
const animateSettingStore = useAnimateSettingStore()
const {
  animateTime,
  animateMoveRange
} = storeToRefs(animateSettingStore)

const fontStore = useFontStore();

</script>

<template>
  <div id="Display-Setting">

    <Fieldset legend="時間字型設定" class="w-full">
      <div class="flex flex-col justify-between gap-y-3">
        <InputGroup class="clock-font">
          <InputGroupAddon>
            時間字型
          </InputGroupAddon>
          <Select v-model="clockFont"
                  :options="fontStore.fontOptions"
                  optionLabel="name"
                  optionValue="value"
                  placeholder="時間字型"
                  checkmark
                  :highlightOnSelect="false"
                  class="w-full md:w-56"
          />
        </InputGroup>
        <InputGroup class="clock-font">
          <InputGroupAddon>
            字型大小
          </InputGroupAddon>
          <InputNumber v-model="clockFontSize" inputId="minmax-buttons" mode="decimal" showButtons :min="12" :max="144"
                       fluid/>
          <InputGroupAddon>
            px
          </InputGroupAddon>
        </InputGroup>
        <!--        <Button label="設定" icon="pi pi-cog" severity="success" @click="setClockFont"/>-->
      </div>
    </Fieldset>

    <Fieldset legend="動畫設定" class="w-full">
      <div class="flex flex-col justify-between gap-y-3">
        <InputGroup class="clock-font">
          <InputGroupAddon>
            動畫時間
          </InputGroupAddon>
          <InputNumber
              v-model="animateTime"
              inputId="minmax-buttons"
              mode="decimal"
              showButtons
              :min="1"
              :max="60"
              fluid
          />
          <InputGroupAddon>
            秒
          </InputGroupAddon>
        </InputGroup>

        <InputGroup class="clock-font">
          <InputGroupAddon>
            移動距離
          </InputGroupAddon>
          <InputNumber
              v-model="animateMoveRange"
              inputId="minmax-buttons"
              mode="decimal"
              showButtons
              :min="100"
              :max="1000"
              fluid
          />
          <InputGroupAddon>
            px
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Fieldset>

    <Fieldset legend="顏色設定" class="w-full">
      <div class="flex justify-between gap-3">
        <InputGroup class="clock-font">
          <InputGroupAddon>
            背景顏色
          </InputGroupAddon>
          <InputText v-model="bgColor"/>
          <ColorPicker v-model="bgColor" format="hex" inline/>
        </InputGroup>

        <InputGroup class="clock-font">
          <InputGroupAddon>
            剩餘時間
          </InputGroupAddon>
          <InputText v-model="remainingTimeColor"/>
          <ColorPicker v-model="remainingTimeColor" format="hex" inline/>
        </InputGroup>

        <InputGroup class="clock-font">
          <InputGroupAddon>
            已過時間
          </InputGroupAddon>
          <InputText v-model="elapsedTimeColor"/>
          <ColorPicker v-model="elapsedTimeColor" format="hex" inline/>
        </InputGroup>
      </div>
    </Fieldset>

  </div>
</template>

<style lang="scss" scoped>
#Display-Setting {
}
</style>
