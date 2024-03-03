import { Button, View } from 'react-native'
import { useState } from 'react'
import { mkdir, writeFile } from '@/libs/fs'
import { systemSignal } from '@/signals/system'
import { vaultsSignal } from '@/signals/vaults'
import { router } from 'expo-router'

export default function WelcomHomeScreen() {
  const [loading, setLoading] = useState(false)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title='Create a new vault with demo data'
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

              systemSignal.value = { ...systemSignal.value, vault: 'default', file: 'README.md' }

              router.replace('/')
            })
            .finally(() => setLoading(false))
        }}
      />
    </View>
  )
}
