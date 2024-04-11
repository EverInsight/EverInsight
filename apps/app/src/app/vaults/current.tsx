import { View } from 'react-native'
import { Stack, router } from 'expo-router'
import { systemSignal } from '@/signals/system'
import { type LsInfo, lsWithInfo } from '@/libs/fs'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { themeSignal } from '@/signals/theme'

export default function VaultsShowScreen() {
  const [folders, setFolders] = useState<LsInfo[]>([])

  useEffect(() => {
    lsWithInfo(systemSignal.value.vault).then(setFolders)
  }, [systemSignal.value.vault])

  return (
    <>
      <Stack.Screen
        options={{
          title: systemSignal.value.vault,
          headerTitleAlign: 'center',
        }}
      />
      <View style={{ flex: 1 }}>
        {folders.map(folder => (
          <Button
            key={folder.directory}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: themeSignal.value.styles.spacings.lg,
            }}
            underline
            onPress={() => router.push(`/directories/${folder.directory}/`)}
          >
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex: 1 }}>
              {folder.directory}
            </Text>
            <Text
              style={{
                flexDirection: 'row',
                backgroundColor: themeSignal.value.styles.colors.background,
              }}
            >
              {folder.count} {folder.count > 1 ? 'notes' : 'note'} &gt;
            </Text>
          </Button>
        ))}
      </View>
    </>
  )
}
