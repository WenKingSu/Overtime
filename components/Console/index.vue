<script lang="ts" setup>
</script>

<template>
  <div id="console">
    <Tabs value="0">
      <TabList>
        <Tab value="0">時間控制台</Tab>
        <Tab value="1">預留</Tab>
        <Tab value="2">預留</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <p class="m-0">
            <ConsoleTimeControl/>
          </p>
        </TabPanel>
        <TabPanel value="1">
          <p class="m-0">
            預留 1
          </p>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            預留 2
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style lang="scss" scoped>
#console {
}
</style>
