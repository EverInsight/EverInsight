import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { readFile, writeFile } from '@/libs/fs'
import { debounce } from 'lodash'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { Mdx } from '@/components/Mdx'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Octicons } from '@expo/vector-icons'
import { use } from '@/context'

export default function DocumentsShowScreen() {
  const { name } = useLocalSearchParams<{ name: string[] }>()
  const { system, theme } = use()
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [filepath, setFilepath] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!name) return

    setFilepath(`${system.vault}/${name.join('/')}`)
    readFile(filepath).then(data => {
      setContent(data)
    })
  }, [system.vault, name])

  useEffect(() => {
    console.debug('content', content)

    if (mode === 'edit') {
      debounce(() => {
        writeFile(filepath, content)
      }, 1000)()
    }
  })

  if (!name) return null

  return (
    <>
      <Stack.Screen
        options={{
          title: name[name.length - 1].replace('.md', ''),
          headerTitleAlign: 'center',
          headerRight: () => (
            <>
              <Button
                onPress={() => setMode(mode === 'view' ? 'edit' : 'view')}
                style={{ marginRight: theme.styles.spacings.lg }}
              >
                {mode === 'view' ? (
                  <Octicons name='pencil' size={theme.styles.iconSize.default} color={theme.styles.colors.primary} />
                ) : (
                  <Octicons name='eye' size={theme.styles.iconSize.default} color={theme.styles.colors.primary} />
                )}
              </Button>
              <Button onPress={() => router.navigate(`/documents/${name.join('/')}/info`)}>
                <Octicons name='info' size={theme.styles.iconSize.default} color={theme.styles.colors.primary} />
              </Button>
            </>
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          padding: theme.styles.spacings.default,
        }}
      >
        {mode === 'edit' ? (
          <Input multiline value={content} onChangeText={text => setContent(text)} autoFocus />
        ) : (
          <Mdx content={content} />
        )}
      </View>
    </>
  )
}
