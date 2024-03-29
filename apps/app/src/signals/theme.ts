import { get } from '@/libs/storage'
import { effect, signal } from '@preact/signals-react'
import { em } from '@/libs/css'
import { DarkTheme, DefaultTheme, type Theme as NavigationTheme } from '@react-navigation/native'

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
  colors: Color
}

type Color = NavigationTheme['colors']

DefaultTheme.colors.primary = '#454545'
DefaultTheme.colors.background = '#f5f5f5'
DefaultTheme.colors.text = '#454545'
DarkTheme.colors.primary = '#f5f5f5'
DarkTheme.colors.background = '#454545'
DarkTheme.colors.text = '#f5f5f5'

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
    colors: DefaultTheme.colors,
  },
}

export function getTheme(scheme?: string) {
  const theme = get<Theme>('theme')

  if (theme) return theme

  return {
    version: '1',
    styles: {
      ...Styles.default,
      colors: scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors,
    },
  }
}

export const themeSignal = signal(getTheme())

effect(() => {
  console.debug('themeSignal', themeSignal.value)
  // set('theme', themeSignal.value)
})
