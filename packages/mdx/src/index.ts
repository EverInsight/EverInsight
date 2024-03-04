import { evaluateSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export type { MDXComponents } from 'mdx/types'

export function evaluateMdx(content: string) {
  return evaluateSync(content, {
    ...runtime,
    format: 'mdx',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  }).default
}
