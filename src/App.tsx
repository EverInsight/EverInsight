import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Screens } from './screens'
import { VaultsContext, getVaults } from './contexts/vaults'
import { useEffect, useState } from 'react'
import { SystemContext, getSystem, saveSystem } from './contexts/system'

export function App() {
  const isDarkMode = useColorScheme() === 'dark'
  const [system, setSystem] = useState(getSystem)
  const [vaults, setVaults] = useState(getVaults())

  useEffect(() => {
    saveSystem(system)
  }, [system])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SystemContext.Provider value={{ system, setSystem }}>
        <VaultsContext.Provider value={{ vaults, setVaults }}>
          <Screens />
        </VaultsContext.Provider>
      </SystemContext.Provider>
    </SafeAreaView>
  )
}
