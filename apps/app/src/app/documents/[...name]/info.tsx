import { Text } from '@/components/Text'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { signal } from '@preact/signals-react'
import { systemSignal } from '@/signals/system'
import { readFile } from '@/libs/fs'

const filepath = signal('')
const content = signal('')

export default function DocumentsInfoScreen() {
  const { name } = useLocalSearchParams<{ name: string[] }>()

  useEffect(() => {
    filepath.value = `${systemSignal.value.vault}/${name.join('/')}`
    readFile(filepath.value).then(data => {
      content.value = data
    })
  }, [systemSignal.value.vault, name])

  if (!content.value) return null

  return (
    <>
      <Text>{name[name.length - 1].replace('.md', '')}</Text>
    </>
  )
}
