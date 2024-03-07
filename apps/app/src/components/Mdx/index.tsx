import { ScrollView } from 'react-native'
import { MdxContent } from './content'
import { themeSignal } from '@/signals/theme'

export function Mdx(props: { content: string }) {
  return (
    <ScrollView style={{ padding: themeSignal.value.styles.spacings.default }}>
      <MdxContent content={props.content} />
    </ScrollView>
  )
}
