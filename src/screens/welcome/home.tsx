import { Button } from 'react-native'
import { VaultsContext } from '../../contexts/vaults'
import { useContext, useState } from 'react'
import { mkdir, writeFile } from '../../libs/fs'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SystemContext } from '../../contexts/system'

export function WelcomHomeScreen(props: NativeStackScreenProps<ReactNavigation.RootParamList, 'Welcome'>) {
  const [loading, setLoading] = useState(false)
  const { setVaults } = useContext(VaultsContext)
  const { setSystem } = useContext(SystemContext)

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

            setSystem(prev => ({ ...prev, vault: 'default' }))

            props.navigation.replace('Vault')
          })
          .finally(() => setLoading(false))
      }}
    />
  )
}
