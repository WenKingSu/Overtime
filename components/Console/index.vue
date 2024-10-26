<script lang="ts" setup>
</script>

<template>
  <div id="console">
    <Tabs value="0">
      <TabList>
        <Tab value="0">時間控制台</Tab>
        <Tab value="1">顯示設定</Tab>
        <Tab value="2">聊天室設定</Tab>
        <Tab value="3">通用設定</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
<!--          <ConsoleTimeControl/>-->
          <ConsoleChatSetting/>
        </TabPanel>
        <TabPanel value="1">
          <ConsoleDisplaySetting/>
        </TabPanel>
        <TabPanel value="2">
          <ConsoleChatSetting/>
        </TabPanel>
        <TabPanel value="3">
          <ConsoleCommonSetting/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style lang="scss" scoped>
#console {
}
</style>
