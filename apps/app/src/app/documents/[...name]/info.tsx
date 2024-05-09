import { Text } from '@/components/Text'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { signal } from '@preact/signals-react'
import { systemSignal } from '@/signals/system'
import { readFile } from '@/libs/fs'
import { View, Modal, TextInput } from 'react-native'
import { themeSignal } from '@/signals/theme'
import { Button } from '@/components/Button'

const filepath = signal('')
const content = signal('')

export default function DocumentsInfoScreen() {
  const { name } = useLocalSearchParams<{ name: string[] }>()
  const [mode, setMode] = useState<'hidden' | 'rename' | 'delete'>('hidden')

  useEffect(() => {
    filepath.value = `${systemSignal.value.vault}/${name.join('/')}`
    readFile(filepath.value).then(data => {
      content.value = data
    })
  }, [systemSignal.value.vault, name])

  if (!content.value) return null

  return (
    <View style={{ padding: themeSignal.value.styles.spacings.default }}>
      <Stack.Screen
        options={{
          title: 'Info',
          headerTitleAlign: 'center',
        }}
      />
      <Text>Path: {name.join('/')}</Text>
      <Text>Size: {content.value.length} bytes</Text>
      <Button
        title='Rename'
        border
        style={{ marginVertical: themeSignal.value.styles.spacings.default }}
        onPress={() => setMode('rename')}
      />
      <Button title='Delete' border />
      <Modal animationType='slide' transparent visible={mode !== 'hidden'} onRequestClose={() => setMode('hidden')}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TextInput value={name.join('/')} autoFocus />
          <Button title='Cancel' onPress={() => setMode('hidden')} />
          <Button title='Save' />
        </View>
      </Modal>
    </View>
  )
}
