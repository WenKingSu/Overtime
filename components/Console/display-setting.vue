<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import {useFontStore} from "~/store/fontStore";
import {useAnimateSettingStore} from "~/store/animateSettingStore";
import {darkTheme, dateZhTW, NColorPicker, NConfigProvider, zhTW} from 'naive-ui'

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
  <NConfigProvider :dateLocale="dateZhTW" :locale="zhTW" :theme="darkTheme" preflight-style-disabled>
    <div id="Display-Setting">
      <Fieldset class="w-full" legend="時間字型設定">
        <Fluid>
          <div class="grid grid-cols-2 gap-3">
            <div class="col-span-full">
              <InputGroup class="clock-font">
                <InputGroupAddon>
                  時間字型
                </InputGroupAddon>
                <Select v-model="clockFont"
                        :highlightOnSelect="false"
                        :options="fontStore.fontOptions"
                        checkmark
                        class="w-full md:w-56"
                        optionLabel="name"
                        optionValue="value"
                        placeholder="時間字型"/>
              </InputGroup>
            </div>
            <div class="col-span-full">
              <InputGroup class="clock-font">
                <InputGroupAddon>
                  字型大小
                </InputGroupAddon>
                <InputNumber
                    v-model="clockFontSize"
                    :max="144"
                    :min="12"
                    fluid
                    inputId="clockFontSize"
                    mode="decimal"
                    showButtons/>
                <InputGroupAddon>
                  px
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">邊框顏色</label>
              <n-color-picker v-model:value="clockBorderColor" :actions="['clear']" :modes="['hex']" :show-alpha="false"
                              placement="bottom" size="large"/>
            </div>
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">邊框粗細</label>
              <InputGroup class="clock-font">
                <InputNumber
                    v-model="clockBorderSize"
                    :max="Math.floor(clockFontSize / 10)"
                    :min="0"
                    fluid
                    inputId="clockBorderSize"
                    mode="decimal"
                    showButtons/>
                <InputGroupAddon>
                  px
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </Fluid>
      </Fieldset>

      <Fieldset class="w-full" legend="動畫設定">
        <div class="flex flex-col justify-between gap-y-3">
          <InputGroup class="clock-font">
            <InputGroupAddon>
              動畫時間
            </InputGroupAddon>
            <InputNumber
                v-model="animateTime"
                :max="60"
                :min="1"
                fluid
                inputId="animateTime"
                mode="decimal"
                showButtons
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
                :max="1000"
                :min="100"
                fluid
                inputId="animateMoveRange"
                mode="decimal"
                showButtons
            />
            <InputGroupAddon>
              px
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Fieldset>

      <Fieldset class="w-full" legend="顏色設定">
        <Fluid>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">背景顏色</label>
              <n-color-picker v-model:value="bgColor" :actions="['clear']" :modes="['hex']" :show-alpha="false"
                              placement="bottom" size="large"/>
            </div>
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">剩餘時間</label>
              <n-color-picker v-model:value="remainingTimeColor" :actions="['clear']" :modes="['hex']" :show-alpha="false"
                              placement="bottom" size="large"/>
            </div>
            <div>
              <label class="font-bold mb-2 block" for="non-fluid">已過時間</label>
              <n-color-picker v-model:value="elapsedTimeColor" :actions="['clear']" :modes="['hex']" :show-alpha="false"
                              placement="bottom" size="large"/>
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
}
</style>
