import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VaultsHomeScreen } from './vaults/home'
import { WelcomHomeScreen } from './welcome/home'
import { VaultHomeScreen } from './vault/home'
import { systemSignal } from '@signals/system'

type Stacks = {
  Welcome: undefined
  Vault: undefined
  Vaults: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Stacks {}
  }
}

const Stack = createNativeStackNavigator<Stacks>()

export function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={systemSignal.value.vault ? 'Vault' : 'Welcome'}>
        <Stack.Screen name='Welcome' component={WelcomHomeScreen} />
        <Stack.Screen name='Vault' component={VaultHomeScreen} />
        <Stack.Screen name='Vaults' component={VaultsHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
