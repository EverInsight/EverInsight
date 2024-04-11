import { Stack } from 'expo-router'
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { getTheme, themeSignal } from '@/signals/theme'
import { useEffect } from 'react'

export default function Layout() {
  const scheme = useColorScheme()

  useEffect(() => {
    if (!scheme) return

    themeSignal.value = getTheme(scheme)
  }, [scheme])

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar />
      <Stack />
    </ThemeProvider>
  )
}
