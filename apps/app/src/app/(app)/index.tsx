import { effect, signal } from '@preact/signals-react'
import { systemSignal } from '@/signals/system'
import { useEffect } from 'react'
import { Button, TextInput, View } from 'react-native'
import { readFile, writeFile } from '@/libs/fs'
import { debounce } from 'lodash'
import { Stack } from 'expo-router'
import { Mdx } from '@/components/Mdx'

const mode = signal('view')
const content = signal('')

effect(() => {
  console.debug('content', content.value)

  if (mode.value === 'edit') {
    debounce(() => {
      writeFile(`${systemSignal.value.vault}/${systemSignal.value.file}`, content.value)
    }, 1000)()
  }
})

export default function HomeScreen() {
  useEffect(() => {
    readFile(`${systemSignal.value.vault}/${systemSignal.value.file}`).then(data => {
      content.value = data
    })
  }, [systemSignal.value.file])

  return (
    <>
      <Stack.Screen
        options={{
          title: systemSignal.value.file,
          headerRight: () => <HeaderRight />,
        }}
      />
      {mode.value === 'edit' ? <Editor /> : <Viewer />}
    </>
  )
}

function HeaderRight() {
  return (
    <View>
      <Button
        title={mode.value === 'view' ? 'Edit' : 'View'}
        onPress={() => (mode.value = mode.value === 'view' ? 'edit' : 'view')}
      />
    </View>
  )
}

function Viewer() {
  return (
    <View>
      <Mdx content={content.value} />
    </View>
  )
}

function Editor() {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <TextInput multiline value={content.value} onChangeText={text => (content.value = text)} />
    </View>
  )
}
