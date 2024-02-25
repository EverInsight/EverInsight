import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VaultsHomeScreen } from './vaults/home'

const Stack = createNativeStackNavigator()

export function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Vaults'>
        <Stack.Screen name='Vaults' component={VaultsHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
