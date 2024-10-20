import {useSpeakSettingStore} from "~/store/speakSettingStore.js";

export const useSpeak = () => {
    const speakSettingStore = useSpeakSettingStore()
    const {
        rate,
        pitch,
        voice,
        queue
    } = storeToRefs(speakSettingStore)

    const synth = ref()
    const voices = ref([]);

    const populateVoiceList = () => {
        voices.value = synth.value
            .getVoices()
            .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));

        // console.log('voices清單', voices.value);
        if (!voice.value && voices.value.length > 0) {
            voice.value = voices.value.filter(i => i.default == true)[0].name;
        }
    };

    const speak = (synth, voices, message) => {
        if (synth.speaking) {
            console.log('speechSynthesis.speaking');
            return false;
        }

        if (message !== '') {
            const utterThis = new SpeechSynthesisUtterance(message);

            utterThis.onend = () => {
                console.log('SpeechSynthesisUtterance.onend');
            };

            utterThis.onerror = () => {
                console.error('SpeechSynthesisUtterance.onerror');
            };

            for (const v of voices.value) {
                if (v.name === voice.value) {
                    utterThis.voice = v;
                    break;
                }
            }
            utterThis.pitch = pitch.value;
            utterThis.rate = rate.value;
            synth.speak(utterThis);
            return true;
        }
    };

    const speakWithQueue = () => {
        console.log('speak queue:', queue.value)
        if (queue.value.length > 0) {
            const message = queue.value[0]
            if (synth.value, voice.value, message){
                message.value.pop(0)
            }
        }
    }

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
    });
    return {
        speak,
        speakWithQueue
    }
}
