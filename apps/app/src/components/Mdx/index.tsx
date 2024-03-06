import { evaluateMdx } from '@everinsight/mdx'
import { components } from './components'
import { ScrollView } from 'react-native'

export function Mdx(props: { content: string }) {
  const Content = evaluateMdx(props.content)

  return (
    <ScrollView>
      <Content components={components} />
    </ScrollView>
  )
}
