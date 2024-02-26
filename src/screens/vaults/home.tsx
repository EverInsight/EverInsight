import { Button, Text, View } from 'react-native'
import { VaultsContext } from '../../contexts/vaults'
import { useContext, useState } from 'react'
import { mkdir, writeFile } from '../../libs/fs'

export function VaultsHomeScreen() {
  const { vaults } = useContext(VaultsContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {vaults.currentVault ? (
        <>
          <Text>Manage Vaults:</Text>
          <Text>{JSON.stringify(vaults.vaults)}</Text>
          <Button title='new Vault' />
        </>
      ) : (
        <NewVault />
      )}
    </View>
  )
}

function NewVault() {
  const [loading, setLoading] = useState(false)
  const { setVaults } = useContext(VaultsContext)

  return (
    <Button
      title='Init a new Vault'
      disabled={loading}
      onPress={async () => {
        setLoading(true)
        mkdir('default')
          .then(async () => {
            await writeFile('default/README.md', '# Hello World!')
            setVaults(prev => ({
              ...prev,
              vaults: {
                ...prev.vaults,
                default: {
                  version: '1',
                  type: 'local',
                  name: 'default',
                  path: 'default',
                },
              },
              currentVault: 'default',
            }))
          })
          .finally(() => setLoading(false))
      }}
    />
  )
}
