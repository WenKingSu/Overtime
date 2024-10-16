import {defineConfig, presetAttributify, presetIcons, presetUno, transformerVariantGroup} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: [
    [/^(flex|grid)-center/g, () => 'flex justify-center items-center'],
    [/^(flex|grid)-x-center/g, () => 'flex justify-center'],
    [/^(flex|grid)-y-center/g, () => 'flex flex-col items-center'],
    [/^inline-(flex|grid)-center/g, () => 'inline-flex justify-center items-center'],
    [/^inline-(flex|grid)-x-center/g, () => 'inline-flex justify-center'],
    [/^inline-(flex|grid)-y-center/g, () => 'inline-flex items-center']
  ],
  theme: {
    breakpoints: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1400px',
      '2xl': '1400px',
      'xxxl': '2000px',
      '3xl': '2000px'
    },
    colors: {
      'green': {
        'dark': '#00D289',
        'light': '#00FFA6'
      },
      'orange': '#FFAC33',
      'red': '#AA1F00',
      'gray': {
        DEFAULT: '#1F1F1F',
        600: '#1F1F1F',
        500: '#393939',
        400: '#808080',
        300: '#AEAEAE',
        200: '#D9D9D9',
        100: '#F1F1F1',
      },
    }
  },
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    presetIcons(),
    // ...custom presets
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
