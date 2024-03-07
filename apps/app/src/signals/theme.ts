import { get } from '@/libs/storage'
import { effect, signal } from '@preact/signals-react'
import { em } from '@/libs/css'

export type Theme = {
  version: string
  styles: Style
}

type Style = {
  spacings: {
    default: number
  }
  fontSize: {
    default: number
    lg: number
    xl: number
    xxl: number
  }
}

const Styles: Record<'default', Style> = {
  default: {
    spacings: {
      default: em(0.5),
    },
    fontSize: {
      default: em(1),
      lg: em(1.25),
      xl: em(1.5),
      xxl: em(1.75),
    },
  },
}

function getTheme() {
  const theme = get<Theme>('theme')

  if (theme) return theme

  return { version: '1', styles: Styles.default }
}

export const themeSignal = signal(getTheme())

effect(() => {
  console.debug('themeSignal', themeSignal.value)
  // set('theme', themeSignal.value)
})
