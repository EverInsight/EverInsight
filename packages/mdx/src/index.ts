import { type UseMdxComponents, evaluateSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Root } from 'hast'
import { filter } from './filter'

export type { MDXComponents } from 'mdx/types'

export type { UseMdxComponents }

export function evaluateMdx(content: string, useMDXComponents?: UseMdxComponents) {
  let mdast: Root

  const MDXContent = evaluateSync(content, {
    ...runtime,
    useMDXComponents,
    format: 'mdx',
    remarkPlugins: [remarkRehype, remarkGfm, filter, () => tree => (mdast = tree)],
    rehypePlugins: [rehypeHighlight],
  }).default

  return Object.assign(MDXContent, { mdast, debug: () => console.debug(JSON.stringify(mdast, null, 2)) })
}
