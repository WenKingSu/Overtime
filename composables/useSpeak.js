import {useSpeakSettingStore} from "~/store/speakSettingStore.js";

export const useSpeak = () => {
    const speakSettingStore = useSpeakSettingStore()
    const {
        synth,
        rate,
        pitch,
        voice,
        voices,
        queue
    } = storeToRefs(speakSettingStore)

    const speak = (message) => {
        if (message.startsWith("!")){
            return true;
        }
        if (synth.value.speaking) {
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
            console.log('utterThis', utterThis);
            synth.value.speak(utterThis);
            return true;
        }
    };

    const speakWithQueue = () => {
        console.log('speak queue:', queue.value)
        if (queue.value.length > 0) {
            const message = queue.value[0]
            const result = speak(message)
            if (result){
                queue.value.shift()
                console.log('queue', queue.value)
            }
        }
    }

    return {
        speak,
        speakWithQueue
    }
}
