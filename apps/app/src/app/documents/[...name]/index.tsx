import { effect, signal } from '@preact/signals-react'
import { systemSignal } from '@/signals/system'
import { useEffect } from 'react'
import { View } from 'react-native'
import { readFile, writeFile } from '@/libs/fs'
import { debounce } from 'lodash'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { Mdx } from '@/components/Mdx'
import { themeSignal } from '@/signals/theme'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Octicons } from '@expo/vector-icons'

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
      <View
        style={{
          flex: 1,
          padding: themeSignal.value.styles.spacings.default,
        }}
      >
        {mode.value === 'edit' ? <Editor /> : <Viewer />}
      </View>
    </>
  )
}

function HeaderRight() {
  const { name } = useLocalSearchParams<{ name: string[] }>()

  return (
    <>
      <Button
        onPress={() => (mode.value = mode.value === 'view' ? 'edit' : 'view')}
        style={{ marginRight: themeSignal.value.styles.spacings.lg }}
      >
        {mode.value === 'view' ? (
          <Octicons
            name='pencil'
            size={themeSignal.value.styles.iconSize.default}
            color={themeSignal.value.styles.colors.primary}
          />
        ) : (
          <Octicons
            name='eye'
            size={themeSignal.value.styles.iconSize.default}
            color={themeSignal.value.styles.colors.primary}
          />
        )}
      </Button>
      <Button onPress={() => router.navigate(`/documents/${name.join('/')}/info`)}>
        <Octicons
          name='info'
          size={themeSignal.value.styles.iconSize.default}
          color={themeSignal.value.styles.colors.primary}
        />
      </Button>
    </>
  )
}

function Viewer() {
  return (
    <>
      <Mdx content={content.value} />
    </>
  )
}

function Editor() {
  return (
    <>
      <Input multiline value={content.value} onChangeText={text => (content.value = text)} autoFocus />
    </>
  )
}
