import { Text } from '@/components/Text'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View, Modal, TextInput } from 'react-native'
import { Button } from '@/components/Button'
import { use } from '@/context'

export default function DocumentsInfoScreen() {
  const { name } = useLocalSearchParams<{ name: string[] }>()
  const [mode, setMode] = useState<'hidden' | 'rename' | 'delete'>('hidden')
  const { theme } = use()

  return (
    <View style={{ padding: theme.styles.spacings.default }}>
      <Stack.Screen
        options={{
          title: 'Info',
          headerTitleAlign: 'center',
        }}
      />
      <Text>Path: {name?.join('/')}</Text>
      <Text>Size: bytes</Text>
      <Button
        title='Rename'
        border
        style={{ marginVertical: theme.styles.spacings.default }}
        onPress={() => setMode('rename')}
      />
      <Button title='Delete' border />
      <Modal animationType='slide' transparent visible={mode !== 'hidden'} onRequestClose={() => setMode('hidden')}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TextInput value={name?.join('/')} autoFocus />
          <Button title='Cancel' onPress={() => setMode('hidden')} />
          <Button title='Save' />
        </View>
      </Modal>
    </View>
  )
}
