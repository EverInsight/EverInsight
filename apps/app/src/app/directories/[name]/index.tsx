import { View } from 'react-native'
import { useLocalSearchParams, Stack, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ls } from '@/libs/fs'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { themeSignal } from '@/signals/theme'
import { systemSignal } from '@/signals/system'

export default function DirectoriesShowScreen() {
  const { name } = useLocalSearchParams()
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    ls(`${systemSignal.value.vault}/${name}`).then(setFiles)
  }, [name])

  return (
    <>
      <Stack.Screen
        options={{
          title: name as string,
          headerTitleAlign: 'center',
        }}
      />
      <View style={{ flex: 1 }}>
        {files.map(file => (
          <Button
            key={file}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: themeSignal.value.styles.spacings.lg,
            }}
            underline
            onPress={() => router.push(`/documents/${name}/${file}/`)}
          >
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex: 1 }}>
              {file}
            </Text>
            <Text
              style={{
                flexDirection: 'row',
                backgroundColor: themeSignal.value.styles.colors.background,
              }}
            >
              &gt;
            </Text>
          </Button>
        ))}
      </View>
    </>
  )
}
