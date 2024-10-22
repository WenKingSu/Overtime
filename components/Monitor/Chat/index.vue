<script lang="ts" setup>

import {useSpeakSettingStore} from "~/store/speakSettingStore";

const speakSettingStore = useSpeakSettingStore()
const {
  synth,
  voices,
  voice
} = storeToRefs(speakSettingStore)

const speak = useSpeak()

const populateVoiceList = () => {
  voices.value = synth.value
      .getVoices()
      .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));

  // console.log('voices清單', voices.value);
  if (!voice.value && voices.value.length > 0) {
    voice.value = voices.value.filter(i => i.default == true)[0].name;
  }
};

onBeforeMount(async () => {
  synth.value = window.speechSynthesis
  await nextTick()
})

onMounted(() => {
  if (synth.value.onvoiceschanged !== undefined) {
    synth.value = window.speechSynthesis;
    synth.value.onvoiceschanged = populateVoiceList
    console.log('SpeechSynthesis is supported.');
  } else {
    console.log('SpeechSynthesis is not supported.');
  }

  // setInterval(() => {
  //   speak.speakWithQueue()
  // }, 5000)
});

</script>

<template>
  <Splitter id="Monitor-Chat" class="w-full h-full">
    <SplitterPanel class="flex items-start justify-start">
      <MonitorChatTwitch/>
    </SplitterPanel>
    <SplitterPanel class="flex items-start justify-start">
      <MonitorChatYoutube/>
    </SplitterPanel>
  </Splitter>
</template>

<style lang="scss" scoped>
#Monitor-Chat {
}
</style>
