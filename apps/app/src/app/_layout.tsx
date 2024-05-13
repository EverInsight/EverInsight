import { Stack } from 'expo-router'
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Provider } from '@/context/index'
import { loadSystem, saveSystem, type System } from '@/context/system'
import { type Theme, loadTheme } from '@/context/theme'
import { type Vaults, loadVaults, saveVaults } from '@/context/vaults'

export default function Layout() {
  const scheme = useColorScheme()
  const [system, setSystem] = useState<System>(loadSystem())
  const [theme, setTheme] = useState<Theme>(loadTheme())
  const [vaults, setVaults] = useState<Vaults>(loadVaults())

  useEffect(() => {
    if (!scheme) return

    setTheme(loadTheme(scheme))
  }, [scheme])

  useEffect(() => {
    saveSystem(system)
  }, [system])

  useEffect(() => {
    saveVaults(vaults)
  }, [vaults])

  return (
    <Provider value={{ system, setSystem, theme, setTheme, vaults, setVaults }}>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar />
        <Stack />
      </ThemeProvider>
    </Provider>
  )
}
