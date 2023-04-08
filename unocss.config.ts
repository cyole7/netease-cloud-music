import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'content-padding': 'pt-header pb-footer',
      'flex-center': 'items-center justify-center',
    },
  ],
  theme: {
    colors: {
      'theme': 'var(--color-primary-6)',
      'theme-hover': 'var(--color-primary-5)',
    },
    height: {
      header: 'var(--header-height)',
      footer: 'var(--footer-height)',
    },
    boxShadow: {
      footer: '0px -5px 24px 0px rgba(20, 24, 63, 0.15)',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
