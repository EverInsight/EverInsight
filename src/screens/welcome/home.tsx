import { Button } from 'react-native'
import { useState } from 'react'
import { mkdir, writeFile } from '../../libs/fs'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { systemSignal } from '@signals/system'
import { vaultsSignal } from '@signals/vaults'

export function WelcomHomeScreen(props: NativeStackScreenProps<ReactNavigation.RootParamList, 'Welcome'>) {
  const [loading, setLoading] = useState(false)

  return (
    <Button
      title='Init a new Vault'
      disabled={loading}
      onPress={async () => {
        setLoading(true)
        mkdir('default')
          .then(async () => {
            await writeFile('default/README.md', '# Hello World!')
            vaultsSignal.value = {
              ...vaultsSignal.value,
              vaults: {
                ...vaultsSignal.value.vaults,
                default: {
                  version: '1',
                  type: 'local',
                  name: 'default',
                  path: 'default',
                },
              },
              currentVault: 'default',
            }

            systemSignal.value = { ...systemSignal.value, vault: 'default' }

            props.navigation.replace('Vault')
          })
          .finally(() => setLoading(false))
      }}
    />
  )
}
