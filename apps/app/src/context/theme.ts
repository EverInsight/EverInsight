import { em } from '@/libs/css'
import { DarkTheme, DefaultTheme, type Theme as NavigationTheme } from '@react-navigation/native'

export type Theme = {
  version: string
  styles: Style
}

type Style = {
  spacings: {
    default: number
    lg: number
  }
  fontSize: {
    default: number
    lg: number
    xl: number
    xxl: number
  }
  iconSize: {
    default: number
  }
  colors: Color
}

type Color = NavigationTheme['colors']

DefaultTheme.colors.primary = '#454545'
DefaultTheme.colors.background = '#f5f5f5'
DefaultTheme.colors.text = DefaultTheme.colors.primary
DefaultTheme.colors.border = '#a2a2a2'
DarkTheme.colors.primary = '#f5f5f5'
DarkTheme.colors.background = '#454545'
DarkTheme.colors.text = DarkTheme.colors.primary
DarkTheme.colors.border = '#7a7a7a'

const Styles: Record<'default', Style> = {
  default: {
    spacings: {
      default: em(0.5),
      lg: em(1),
    },
    fontSize: {
      default: em(1),
      lg: em(1.25),
      xl: em(1.5),
      xxl: em(1.75),
    },
    iconSize: {
      default: em(1.25),
    },
    colors: DefaultTheme.colors,
  },
}

export function loadTheme(scheme?: string) {
  return {
    version: '1',
    styles: {
      ...Styles.default,
      colors: scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors,
    },
  }
}
