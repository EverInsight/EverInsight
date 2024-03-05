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
  Strong,
  EM,
  Del,
  UL,
  LI,
  BlockQuote,
  Div,
  BR,
} from '@expo/html-elements'
import type { ReactNode } from 'react'
import { Image, Text } from 'react-native'

export const components: MDXComponents = {
  p: Wrapper('p'),
  div: Wrapper('div'),
  h1: Wrapper('h1'),
  h2: Wrapper('h2'),
  h3: Wrapper('h3'),
  h4: Wrapper('h4'),
  h5: Wrapper('h5'),
  h6: Wrapper('h6'),
  strong: Wrapper('strong'),
  em: Wrapper('em'),
  del: Wrapper('del'),
  hr: Wrapper('hr'),
  code: Wrapper('code'),
  pre: Wrapper('pre'),
  a: Wrapper('a'),
  ul: Wrapper('ul'),
  ol: Wrapper('ol'),
  li: Wrapper('li'),
  blockquote: Wrapper('blockquote'),
  img: Wrapper('img'),
  br: Wrapper('br'),
  span: Wrapper('p'),
  wrapper: Wrapper('wrapper'),
  input: Wrapper('p'),
  sup: Wrapper('div'),
  sub: Wrapper('div'),
  table: Wrapper('div'),
  thead: Wrapper('div'),
  tbody: Wrapper('div'),
  tr: Wrapper('div'),
  th: Wrapper('p'),
  td: Wrapper('p'),
  section: Wrapper('div'),
  footnoteReference: Wrapper('div'),
  footnoteDefinition: Wrapper('div'),
}

type WrapperProps = {
  [key: string]: any
  children?: React.ReactNode
}

function Wrapper(role: string) {
  switch (role) {
    case 'wrapper':
      return (props: WrapperProps) => <Text>{props.children}</Text>
    case 'p':
      return (props: WrapperProps) =>
        typeof props.children === 'string' ? <Text>{props.children}</Text> : props.children
    case 'div':
      return Container
    case 'h1':
      return (props: WrapperProps) => <H1>{props.children}</H1>
    case 'h2':
      return (props: WrapperProps) => <H2>{props.children}</H2>
    case 'h3':
      return (props: WrapperProps) => <H3>{props.children}</H3>
    case 'h4':
      return (props: WrapperProps) => <H4>{props.children}</H4>
    case 'h5':
      return (props: WrapperProps) => <H5>{props.children}</H5>
    case 'h6':
      return (props: WrapperProps) => <H6>{props.children}</H6>
    case 'strong':
      return (props: WrapperProps) => <Strong>{props.children}</Strong>
    case 'em':
      return (props: WrapperProps) => <EM>{props.children}</EM>
    case 'del':
      return (props: WrapperProps) => <Del>{props.children}</Del>
    case 'hr':
      return () => <HR />
    case 'code':
      return (props: WrapperProps) => <Code>{props.children}</Code>
    case 'pre':
      return (props: WrapperProps) => <Pre>{props.children}</Pre>
    case 'a':
      return (props: WrapperProps) => <A href={props.href}>{props.children}</A>
    case 'ul':
      return ({ children }: WrapperProps) => {
        if (!children || !Array.isArray(children)) return null

        const filtered = children.filter(
          (child, index) => index !== 0 && index !== children.length - 1 && child !== '\n'
        )

        return <UL>{filtered}</UL>
      }
    case 'ol':
      return ({ children }: WrapperProps) => {
        if (!children || !Array.isArray(children)) return null

        const filtered = children
          .filter((child, index) => index !== 0 && index !== children.length - 1 && child !== '\n')
          .map((child, index) => ({
            ...child,
            props: { ...child.props, children: `${index + 1}. ${child.props.children}` },
          }))

        return <UL>{filtered}</UL>
      }
    case 'li':
      return ({ children }: WrapperProps) => {
        if (!children) return null

        if (Array.isArray(children)) {
          const filtered = children.filter(child => child !== '\n').map((child, index) => <LI key={index}>{child}</LI>)

          return <LI>{filtered}</LI>
        }

        return <LI>{children}</LI>
      }
    case 'blockquote':
      return ({ children }: WrapperProps) => {
        if (!children || !Array.isArray(children)) return null

        const filtered = children.filter(
          (child, index) => index !== 0 && index !== children.length - 1 && child !== '\n'
        )

        return <BlockQuote>{filtered}</BlockQuote>
      }
    case 'img':
      return ({ src, alt }: WrapperProps) => {
        return <Image src={src} alt={alt} />
      }
    case 'br':
      return () => <BR />
  }

  return (props: WrapperProps) => props.children
}

function Container({ children }: { children?: React.ReactNode }): ReactNode {
  if (!children) return null

  if (typeof children === 'string') return <Text>{children}</Text>

  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (typeof child === 'string') return <Text key={index}>{child}</Text>

      if (Array.isArray(child.props.children)) return Container({ children: child.props.children })

      return child
    })
  }

  return <Div>{children}</Div>
}
