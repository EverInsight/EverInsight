import { Slot } from 'expo-router'
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  const scheme = useColorScheme()

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar />
      <Slot />
    </ThemeProvider>
  )
}
