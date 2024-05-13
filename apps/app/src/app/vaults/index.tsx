import { use } from '@/context'
import { Button, Text, View } from 'react-native'

export default function VaultsHomeScreen() {
  const { vaults } = use()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Manage Vaults:</Text>
      <Text>{JSON.stringify(vaults.vaults)}</Text>
      <Button title='new Vault' />
    </View>
  )
}
