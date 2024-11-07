import {defineStore} from "pinia";

export const useFontStore = defineStore("Font", () => {
    const fontInfos = computed(() => {
        const fontFiles = import.meta.glob("@/public/fonts/*")
        const paths = []
        for (const path of Object.keys(fontFiles)) {
            const split = path.split('/')
            const fileName = split[split.length - 1]
            const name = fileName.split('.')[0]
            paths.push({
                'name': name,
                'url': path.replaceAll('/public', ''),
            })
        }
        return paths
    })

    const fontPaths = computed(() => {
        const fontFiles = import.meta.glob("@/public/fonts/*")
        const paths = []
        for (const path of Object.keys(fontFiles)) {
            paths.push(path)
        }
        return paths
    })

    const fontOptions = computed(() => {
        const fontFiles = import.meta.glob("@/public/fonts/*")
        const options = []
        for (const path of Object.keys(fontFiles)) {
            const split = path.split('/')
            const fileName = split[split.length - 1]
            const name = fileName.split('.')[0]
            options.push({name: name, value: name})
        }
        return options
    })

    return {
        fontInfos,
        fontPaths,
        fontOptions,
    }
})
