import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Screens } from './screens'
import { getSetting } from './libs/storage'
import { SettingContext } from './contexts/setting'
import { useState } from 'react'

export function App() {
  const isDarkMode = useColorScheme() === 'dark'
  const [setting, setSetting] = useState(getSetting())

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SettingContext.Provider value={{ setting, setSetting }}>
        <Screens />
      </SettingContext.Provider>
    </SafeAreaView>
  )
}
