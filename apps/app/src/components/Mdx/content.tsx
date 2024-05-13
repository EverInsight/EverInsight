import { evaluateMdx } from '@everinsight/mdx'
import { components } from './components'
import { use } from '@/context'

export function MdxContent(props: { content: string }) {
  const { theme } = use()
  const Content = evaluateMdx(props.content, () => components(theme))

  // Content.debug()

  return <Content />
}
