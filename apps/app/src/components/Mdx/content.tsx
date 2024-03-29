import { evaluateMdx } from '@everinsight/mdx'
import { components } from './components'
import { themeSignal } from '@/signals/theme'

export function MdxContent(props: { content: string }) {
  const Content = evaluateMdx(props.content, () => components(themeSignal.value))

  // Content.debug()

  return <Content />
}
