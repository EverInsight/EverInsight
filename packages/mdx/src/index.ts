import { evaluateSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Root } from 'hast'
import { filter } from './filter'

export type { MDXComponents } from 'mdx/types'

export function evaluateMdx(content: string) {
  let mdast: Root

  const MDXContent = evaluateSync(content, {
    ...runtime,
    format: 'mdx',
    remarkPlugins: [remarkRehype, remarkGfm, filter, () => tree => (mdast = tree)],
    rehypePlugins: [rehypeHighlight],
  }).default

  return Object.assign(MDXContent, { mdast })
}
