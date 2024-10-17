<script lang="ts" setup>
import {useDisplaySettingStore} from "~/store/displaySettingStore";
const displayStore = useDisplaySettingStore();
const {bgColor} = storeToRefs(displayStore)
</script>

<template>
  <div id="monitor" class="w-full h-full">
    <Tabs value="0" class="w-full h-full">
      <TabList>
        <Tab value="0">時間顯示</Tab>
        <Tab value="1">預留</Tab>
        <Tab value="2">預留</Tab>
      </TabList>
      <TabPanels class="w-full h-full" :style="{backgroundColor: `#${bgColor}`}">
        <TabPanel value="0" class="h-full">
          <MonitorClock/>
        </TabPanel>
<!--        <TabPanel value="1">-->
<!--          <ConsoleDisplaySetting/>-->
<!--        </TabPanel>-->
<!--        <TabPanel value="2">-->
<!--          <ConsoleCommonSetting/>-->
<!--        </TabPanel>-->
        <!--        <TabPanel value="2">-->
        <!--          <p class="m-0">-->
        <!--            預留 2-->
        <!--          </p>-->
        <!--        </TabPanel>-->
      </TabPanels>
    </Tabs>
  </div>
</template>

<style lang="scss" scoped>
#monitor {
}
</style>
