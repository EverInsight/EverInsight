import { ScrollView } from 'react-native'
import { MdxContent } from './content'
import { themeSignal } from '@/signals/theme'

export function Mdx(props: { content: string }) {
  return (
    <ScrollView
      style={{
        backgroundColor: themeSignal.value.styles.colors.background,
      }}
    >
      <MdxContent content={props.content} />
    </ScrollView>
  )
}
