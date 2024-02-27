import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Screens } from './screens'

export function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Screens />
    </SafeAreaView>
  )
}
