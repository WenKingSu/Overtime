<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useFontStore} from "~/store/fontStore";
import {useAnimateSettingStore} from "~/store/animateSettingStore";
import { NColorPicker, NConfigProvider, darkTheme } from 'naive-ui'
import { zhTW, dateZhTW } from 'naive-ui'

const displaySettingStore = useDisplaySettingStore();
const {
  bgColor,
  clockFont,
  clockFontSize,
  clockBorderColor,
  clockBorderSize,
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
  <NConfigProvider preflight-style-disabled :theme="darkTheme" :locale="zhTW" :dateLocale="dateZhTW">
    <div id="Display-Setting">
      <Fieldset legend="時間字型設定" class="w-full">
        <Fluid>
        <div class="grid grid-cols-2 gap-3">
            <div class="col-span-full">
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
                        class="w-full md:w-56"/>
              </InputGroup>
            </div>
            <div class="col-span-full">
              <InputGroup class="clock-font">
                <InputGroupAddon>
                  字型大小
                </InputGroupAddon>
                <InputNumber
                    v-model="clockFontSize"
                    inputId="minmax-buttons"
                    mode="decimal"
                    showButtons
                    :min="12"
                    :max="144"
                    fluid/>
                <InputGroupAddon>
                  px
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div>
              <label for="non-fluid" class="font-bold mb-2 block">邊框顏色</label>
              <n-color-picker v-model:value="clockBorderColor" :modes="['hex']" :actions="['clear']" size="large" placement="bottom" :show-alpha="false"/>
            </div>
            <div>
              <label for="non-fluid" class="font-bold mb-2 block">邊框粗細</label>
              <InputGroup class="clock-font">
                <InputNumber
                    v-model="clockBorderSize"
                    inputId="minmax-buttons"
                    mode="decimal"
                    showButtons
                    :min="0"
                    :max="Math.floor(clockFontSize / 10)"
                    fluid/>
                <InputGroupAddon>
                  px
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </Fluid>
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
        <Fluid>
         <div class="grid grid-cols-3 gap-3">
            <div>
              <label for="non-fluid" class="font-bold mb-2 block">背景顏色</label>
              <n-color-picker v-model:value="bgColor" :modes="['hex']" :actions="['clear']" size="large" placement="bottom" :show-alpha="false"/>
            </div>
            <div>
              <label for="non-fluid" class="font-bold mb-2 block">剩餘時間</label>
              <n-color-picker v-model:value="remainingTimeColor" :modes="['hex']" :actions="['clear']" size="large" placement="bottom" :show-alpha="false"/>
            </div>
            <div>
              <label for="non-fluid" class="font-bold mb-2 block">已過時間</label>
              <n-color-picker v-model:value="elapsedTimeColor" :modes="['hex']" :actions="['clear']" size="large" placement="bottom" :show-alpha="false"/>
            </div>
          </div>
        </Fluid>
      </Fieldset>
    </div>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
#Display-Setting {
  .n-color-picker {
    height: 40px;
  }
  .p-inputgroupaddon {
    height: 40px;
  }
}
</style>
