import { View, Alert } from 'react-native'
import { useState } from 'react'
import { mkdir, writeFile } from '@/libs/fs'
import { systemSignal } from '@/signals/system'
import { router, Stack } from 'expo-router'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { themeSignal } from '@/signals/theme'

export default function WelcomHomeScreen() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Welcome',
          headerTitleAlign: 'center',
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title='Create a new vault with demo data'
          disabled={loading}
          border
          onPress={async () => {
            setLoading(true)
            mkdir('EverInsight')
              .then(async () => {
                await writeFile('EverInsight/Guides/README.md', '# Hello World!')

                systemSignal.value = { ...systemSignal.value, vault: 'EverInsight' }

                router.replace('/vaults/current')
              })
              .finally(() => setLoading(false))
          }}
        />
        <Text style={{ margin: themeSignal.value.styles.spacings.lg }}>Or</Text>
        <Button title='Restore from an exist vault' underline onPress={() => Alert.alert('Coming soon!')} />
      </View>
    </>
  )
}
