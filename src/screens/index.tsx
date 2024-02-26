import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VaultsHomeScreen } from './vaults/home'
import { useContext } from 'react'
import { SystemContext } from '../contexts/system'
import { WelcomHomeScreen } from './welcome/home'
import { VaultHomeScreen } from './vault/home'

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
  const { system } = useContext(SystemContext)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={system.vault ? 'Vault' : 'Welcome'}>
        <Stack.Screen name='Welcome' component={WelcomHomeScreen} />
        <Stack.Screen name='Vault' component={VaultHomeScreen} />
        <Stack.Screen name='Vaults' component={VaultsHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
