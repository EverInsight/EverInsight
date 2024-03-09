import type { Theme } from '@/signals/theme'
import type { MDXComponents } from '@everinsight/mdx'
import { A, H1, H2, H3, H4, H5, H6, HR, Pre, Code, Strong, EM, Del, UL, LI, Div, BR, P } from '@expo/html-elements'
import { Image, Text, View } from 'react-native'

export function components(theme: Theme): MDXComponents {
  return {
    p: Wrapper('p', theme),
    div: Wrapper('div', theme),
    h1: Wrapper('h1', theme),
    h2: Wrapper('h2', theme),
    h3: Wrapper('h3', theme),
    h4: Wrapper('h4', theme),
    h5: Wrapper('h5', theme),
    h6: Wrapper('h6', theme),
    strong: Wrapper('strong', theme),
    em: Wrapper('em', theme),
    del: Wrapper('del', theme),
    hr: Wrapper('hr', theme),
    code: Wrapper('code', theme),
    pre: Wrapper('pre', theme),
    a: Wrapper('a', theme),
    ul: Wrapper('ul', theme),
    ol: Wrapper('ol', theme),
    li: Wrapper('li', theme),
    blockquote: Wrapper('blockquote', theme),
    img: Wrapper('img', theme),
    br: Wrapper('br', theme),
    span: Wrapper('span', theme),
    input: Wrapper('p', theme),
    sup: Wrapper('div', theme),
    sub: Wrapper('div', theme),
    table: Wrapper('div', theme),
    thead: Wrapper('div', theme),
    tbody: Wrapper('div', theme),
    tr: Wrapper('div', theme),
    th: Wrapper('p', theme),
    td: Wrapper('p', theme),
    section: Wrapper('div', theme),
    footnoteReference: Wrapper('div', theme),
    footnoteDefinition: Wrapper('div', theme),
    Image: () => {
      console.log('Unhandled component')
      return null
    },
  }
}

type WrapperProps = {
  [key: string]: any
  children?: React.ReactNode
}

function Wrapper(role: string, theme: Theme): (props: WrapperProps) => React.ReactNode {
  switch (role) {
    case 'p':
      return function p(props: WrapperProps) {
        if (!props.children) return null

        return (
          <P
            style={{
              marginHorizontal: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.default,
            }}
          >
            {props.children}
          </P>
        )
      }
    case 'div':
      return function div({ children }: WrapperProps) {
        if (!children) return null

        if (typeof children === 'string') {
          if (children === '\n') return null

          return <Text style={{ fontSize: theme.styles.fontSize.default }}>{children}</Text>
        }

        if (Array.isArray(children)) {
          return children.map((child, index) => {
            if (typeof child === 'string') {
              if (child === '\n') return null

              return (
                <Text key={index} style={{ fontSize: theme.styles.fontSize.default }}>
                  {child}
                </Text>
              )
            }

            if (Array.isArray(child.props.children)) return Wrapper('div', theme)(child.props)

            return child
          })
        }

        return <Div>{children}</Div>
      }
    case 'h1':
      return function h1(props: WrapperProps) {
        return (
          <H1
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.xxl,
            }}
          >
            {props.children}
          </H1>
        )
      }
    case 'h2':
      return function h2(props: WrapperProps) {
        return (
          <H2
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.xl,
            }}
          >
            {props.children}
          </H2>
        )
      }
    case 'h3':
      return function h3(props: WrapperProps) {
        return (
          <H3
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.lg,
            }}
          >
            {props.children}
          </H3>
        )
      }
    case 'h4':
      return function h4(props: WrapperProps) {
        return (
          <H4
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.default,
            }}
          >
            {props.children}
          </H4>
        )
      }
    case 'h5':
      return function h5(props: WrapperProps) {
        return (
          <H5
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.default,
            }}
          >
            {props.children}
          </H5>
        )
      }
    case 'h6':
      return function h6(props: WrapperProps) {
        return (
          <H6
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.default,
            }}
          >
            {props.children}
          </H6>
        )
      }
    case 'strong':
      return function strong(props: WrapperProps) {
        return <Strong style={{ fontSize: theme.styles.fontSize.default }}>{props.children}</Strong>
      }
    case 'em':
      return function em(props: WrapperProps) {
        return <EM style={{ fontSize: theme.styles.fontSize.default }}>{props.children}</EM>
      }
    case 'del':
      return function del(props: WrapperProps) {
        return <Del style={{ fontSize: theme.styles.fontSize.default }}>{props.children}</Del>
      }
    case 'hr':
      return () => <HR />
    case 'code':
      return function code(props: WrapperProps) {
        return <Code style={{ fontSize: theme.styles.fontSize.default, marginVertical: 0 }}>{props.children}</Code>
      }
    case 'pre':
      return function pre(props: WrapperProps) {
        return <Pre style={{ fontSize: theme.styles.fontSize.default, marginVertical: 0 }}>{props.children}</Pre>
      }
    case 'a':
      return function a(props: WrapperProps) {
        return (
          <A href={props.href} style={{ fontSize: theme.styles.fontSize.default }}>
            {props.children}
          </A>
        )
      }
    case 'ul':
      return function ul({ children }: WrapperProps) {
        if (!children || !Array.isArray(children)) return null

        const filtered = children.filter(
          (child, index) => index !== 0 && index !== children.length - 1 && child !== '\n'
        )

        return <UL>{filtered}</UL>
      }
    case 'ol':
      return function ol({ children }: WrapperProps) {
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
      return function li({ children }: WrapperProps) {
        if (!children) return null

        if (Array.isArray(children)) {
          const filtered = children.filter(child => child !== '\n').map((child, index) => <LI key={index}>{child}</LI>)

          return <LI>{filtered}</LI>
        }

        return <LI>{children}</LI>
      }
    case 'blockquote':
      return function blockquote({ children }: WrapperProps) {
        if (!children || !Array.isArray(children)) return null

        const filtered = children.filter(
          (child, index) => index !== 0 && index !== children.length - 1 && child !== '\n'
        )

        return <View style={{ marginBottom: theme.styles.spacings.default }}>{filtered}</View>
      }
    case 'img':
      return function img({ src, alt }: WrapperProps) {
        console.log('src', src)
        return <Image src={src} alt={alt} />
      }
    case 'br':
      return function br() {
        return <BR style={{ fontSize: theme.styles.fontSize.default, lineHeight: theme.styles.fontSize.default }} />
      }
    case 'span':
      return function span(props: WrapperProps) {
        return <Text style={{ fontSize: theme.styles.fontSize.default }}>{props.children}</Text>
      }
  }

  return () => null
}
