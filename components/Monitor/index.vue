<script lang="ts" setup>
</script>

<template>
  <div id="monitor" class="w-full h-full">
    <Tabs value="0" class="w-full h-full">
      <TabList>
        <Tab value="0">時間顯示</Tab>
        <Tab value="1">聊天室</Tab>
        <Tab value="2">預留</Tab>
      </TabList>
      <TabPanels class="w-full h-full">
        <TabPanel value="0" class="h-full">
          <MonitorClock/>
        </TabPanel>
        <TabPanel value="1" class="h-full">
          <MonitorChat/>
        </TabPanel>
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
  .p-tabpanels{
    padding: 0;
  }
}
</style>
