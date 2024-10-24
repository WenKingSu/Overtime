<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
import type {MaybeElement} from "@vueuse/core";

const displaySettingStore = useDisplaySettingStore()
const {bgColor} = storeToRefs(displaySettingStore)

const el = shallowRef<MaybeElement>()
const {
  play,
  pause,
} = useAnimate(
    el,
    [
      {opacity: 0, transform: 'translateY(50px)'}, // 初始状态
      {opacity: 1, transform: 'translateY(0px)'}, // 出现时的最终状态
      {opacity: 0, transform: 'translateY(-50px)'}, // 初始状态
    ],
    {
      duration: 2000, // 动画持续时间
      fill: 'forwards', // 保持最终状态
    },
)
const show = ref(true)

onMounted(() => {
  console.log(el)
  // setInterval(()=>{
  //   show.value = !show.value
  // }, 5000)
})

</script>

<template>
  <div
      id="Monitor-Overview-Animate"
      class="w-full h-full flex-y-center justify-center gap-3"
      :style="{backgroundColor: `#${bgColor}`}"
  >

    <Button
        label="Show Box"
        @click="play"
    />

    <div v-show="show" ref="el" class="box">
      <p>This box will fade in and move up.</p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
#Monitor-Overview-Animate {
  .box {
    width: 200px;
    padding: 20px;
    background-color: #42b883;
    color: white;
    text-align: center;
    border-radius: 8px;
    margin-top: 10px;
  }
}
</style>
