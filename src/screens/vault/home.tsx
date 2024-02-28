import { effect, signal } from '@preact/signals-react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { systemSignal } from '@signals/system'
import { useEffect } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { readFile, writeFile } from '@libs/fs'
import { debounce } from 'lodash'
import { evaluateSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

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

export function VaultHomeScreen(props: NativeStackScreenProps<ReactNavigation.RootParamList, 'Vault'>) {
  useEffect(() => {
    props.navigation.setOptions({
      title: systemSignal.value.file,
      headerRight: () => <HeaderRight />,
    })
    readFile(`${systemSignal.value.vault}/${systemSignal.value.file}`).then(data => {
      content.value = data
    })
  }, [systemSignal.value.file])

  if (mode.value === 'edit') {
    return <Editor />
  }

  return <Viewer />
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
  const MdxContent = evaluateSync(content.value, runtime as any).default

  return (
    <View>
      <MdxContent
        components={{
          div: ({ children }: any) => {
            console.log('div', children)
            return <View>{children}</View>
          },
          p: ({ children }: any) => {
            console.log('p', children)
            return <Text>{children}</Text>
          },
        }}
      />
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
