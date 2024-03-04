import type { MDXComponents } from '@everinsight/mdx'
import {
  A,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  HR,
  Pre,
  Code,
  P,
  Strong,
  EM,
  Del,
  UL,
  LI,
  BlockQuote,
  Div,
  BR,
} from '@expo/html-elements'
import { Image } from 'react-native'

export const components: MDXComponents = {
  p: ({ children }) => {
    return <P>{children}</P>
  },
  div: ({ children }) => {
    return <Div>{children}</Div>
  },
  h1: ({ children }) => {
    return <H1>{children}</H1>
  },
  h2: ({ children }) => {
    return <H2>{children}</H2>
  },
  h3: ({ children }) => {
    return <H3>{children}</H3>
  },
  h4: ({ children }) => {
    return <H4>{children}</H4>
  },
  h5: ({ children }) => {
    return <H5>{children}</H5>
  },
  h6: ({ children }) => {
    return <H6>{children}</H6>
  },
  strong: ({ children }) => {
    return <Strong>{children}</Strong>
  },
  em: ({ children }) => {
    return <EM>{children}</EM>
  },
  del: ({ children }) => {
    return <Del>{children}</Del>
  },
  hr: () => <HR />,
  code: ({ children }) => {
    return <Code>{children}</Code>
  },
  pre: ({ children }) => {
    return <Pre>{children}</Pre>
  },
  a: ({ children, href }) => {
    console.log('a', children)
    return <A href={href}>{children}</A>
  },
  ul: ({ children }) => {
    if (!children || !Array.isArray(children)) return null

    const filtered = children.filter((child, index) => index !== 0 && index !== children.length - 1 && child !== '\n')

    return <UL>{filtered}</UL>
  },
  ol: ({ children }) => {
    if (!children || !Array.isArray(children)) return null

    const filtered = children
      .filter((child, index) => index !== 0 && index !== children.length - 1 && child !== '\n')
      .map((child, index) => ({
        ...child,
        props: { ...child.props, children: `${index + 1}. ${child.props.children}` },
      }))

    return <UL>{filtered}</UL>
  },
  li: ({ children }) => {
    if (!children) return null

    if (Array.isArray(children)) {
      const filtered = children.filter(child => child !== '\n').map((child, index) => <LI key={index}>{child}</LI>)

      return <LI>{filtered}</LI>
    }

    return <LI>{children}</LI>
  },
  blockquote: ({ children }) => {
    if (!children || !Array.isArray(children)) return null

    const filtered = children.filter((child, index) => index !== 0 && index !== children.length - 1 && child !== '\n')

    return <BlockQuote>{filtered}</BlockQuote>
  },
  img: ({ src, alt }) => {
    console.log('src', src)
    return <Image src={src} alt={alt} />
  },
  br: () => <BR />,
}
