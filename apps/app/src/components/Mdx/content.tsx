import { evaluateMdx } from '@everinsight/mdx'
import { components } from './components'
import { themeSignal } from '@/signals/theme'

export function MdxContent(props: { content: string }) {
  const Content = evaluateMdx(props.content)

  // console.debug('MdxContent', Content.toJSON())

  return <Content components={components(themeSignal.value)} />
}
