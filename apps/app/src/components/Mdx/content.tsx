import { evaluateMdx } from '@everinsight/mdx'
import { components } from './components'

export function MdxContent(props: { content: string }) {
  const Content = evaluateMdx(props.content)

  // console.debug('MdxContent', Content.toJSON())

  return <Content components={components} />
}
