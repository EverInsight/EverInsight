import { Button, Text, View } from 'react-native'
import { vaultsSignal } from '@signals/vaults'

export function VaultsHomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Manage Vaults:</Text>
      <Text>{JSON.stringify(vaultsSignal.value.vaults)}</Text>
      <Button title='new Vault' />
    </View>
  )
}
