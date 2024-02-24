import { SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View } from 'react-native'

export function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View>
          <Text>Hi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
