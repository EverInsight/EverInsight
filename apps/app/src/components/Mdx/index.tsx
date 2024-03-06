import { ScrollView } from 'react-native'
import { MdxContent } from './content'

export function Mdx(props: { content: string }) {
  return (
    <ScrollView>
      <MdxContent content={props.content} />
    </ScrollView>
  )
}
