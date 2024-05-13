import { ScrollView } from 'react-native'
import { MdxContent } from './content'
import { use } from '@/context'

export function Mdx(props: { content: string }) {
  const { theme } = use()

  return (
    <ScrollView
      style={{
        backgroundColor: theme.styles.colors.background,
      }}
    >
      <MdxContent content={props.content} />
    </ScrollView>
  )
}
