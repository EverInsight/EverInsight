import { View, Alert } from 'react-native'
import { useState } from 'react'
import { mkdir, writeFile } from '@/libs/fs'
import { router, Stack } from 'expo-router'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { use } from '@/context'

export default function WelcomHomeScreen() {
  const [loading, setLoading] = useState(false)
  const { theme, setSystem } = use()

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

                setSystem(prev => ({ ...prev, vault: 'EverInsight' }))

                router.replace('/vaults/current')
              })
              .finally(() => setLoading(false))
          }}
        />
        <Text style={{ margin: theme.styles.spacings.lg }}>Or</Text>
        <Button title='Restore from an exist vault' underline onPress={() => Alert.alert('Coming soon!')} />
      </View>
    </>
  )
}
