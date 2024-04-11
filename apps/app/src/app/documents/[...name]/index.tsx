import { effect, signal } from '@preact/signals-react'
import { systemSignal } from '@/signals/system'
import { useEffect } from 'react'
import { View } from 'react-native'
import { readFile, writeFile } from '@/libs/fs'
import { debounce } from 'lodash'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Mdx } from '@/components/Mdx'
import { themeSignal } from '@/signals/theme'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const mode = signal('view')
const filepath = signal('')
const content = signal('')

effect(() => {
  console.debug('content', content.value)

  if (mode.value === 'edit') {
    debounce(() => {
      writeFile(filepath.value, content.value)
    }, 1000)()
  }
})

export default function DocumentsShowScreen() {
  const { name } = useLocalSearchParams<{ name: string[] }>()

  useEffect(() => {
    filepath.value = `${systemSignal.value.vault}/${name.join('/')}`
    readFile(filepath.value).then(data => {
      content.value = data
    })
  }, [systemSignal.value.vault, name])

  return (
    <>
      <Stack.Screen
        options={{
          title: name[name.length - 1].replace('.md', ''),
          headerTitleAlign: 'center',
          headerRight: () => <HeaderRight />,
        }}
      />
      {mode.value === 'edit' ? <Editor /> : <Viewer />}
    </>
  )
}

function HeaderRight() {
  return (
    <Button
      title={mode.value === 'view' ? 'Edit' : 'View'}
      onPress={() => (mode.value = mode.value === 'view' ? 'edit' : 'view')}
    />
  )
}

function Viewer() {
  return (
    <View style={{ flex: 1 }}>
      <Mdx content={content.value} />
    </View>
  )
}

function Editor() {
  return (
    <View
      style={{
        flex: 1,
        padding: themeSignal.value.styles.spacings.default,
      }}
    >
      <Input multiline value={content.value} onChangeText={text => (content.value = text)} autoFocus />
    </View>
  )
}
