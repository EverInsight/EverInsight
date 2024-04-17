import type { Theme } from '@/signals/theme'
import type { MDXComponents } from '@everinsight/mdx'
import { H1, H2, H3, H4, H5, H6, HR, Pre, Code, Strong, EM, Del, UL, LI, Div, P, A } from '@expo/html-elements'
import { View, Image } from 'react-native'
import { Text } from '../Text'

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
    input: Wrapper('input', theme),
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
        if (!props.children || props.children === '\n') return null

        return (
          <P
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              fontSize: theme.styles.fontSize.default,
              color: theme.styles.colors.text,
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

          return <Text>{children}</Text>
        }

        if (Array.isArray(children)) {
          return children.map((child, index) => {
            if (typeof child === 'string') {
              if (child === '\n') return null

              return <Text key={index}>{child}</Text>
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
              color: theme.styles.colors.text,
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
              color: theme.styles.colors.text,
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
              color: theme.styles.colors.text,
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
              color: theme.styles.colors.text,
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
              color: theme.styles.colors.text,
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
              color: theme.styles.colors.text,
            }}
          >
            {props.children}
          </H6>
        )
      }
    case 'strong':
      return function strong(props: WrapperProps) {
        return (
          <Strong style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text }}>
            {props.children}
          </Strong>
        )
      }
    case 'em':
      return function em(props: WrapperProps) {
        return (
          <EM style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text }}>{props.children}</EM>
        )
      }
    case 'del':
      return function del(props: WrapperProps) {
        return (
          <Del style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text }}>
            {props.children}
          </Del>
        )
      }
    case 'hr':
      return () => <HR />
    case 'code':
      return function code(props: WrapperProps) {
        return (
          <Code
            style={{
              fontSize: theme.styles.fontSize.default,
              marginVertical: 0,
              color: theme.styles.colors.text,
            }}
          >
            {props.children}
          </Code>
        )
      }
    case 'pre':
      return function pre(props: WrapperProps) {
        return (
          <Pre style={{ fontSize: theme.styles.fontSize.default, marginVertical: 0, color: theme.styles.colors.text }}>
            {props.children}
          </Pre>
        )
      }
    case 'a':
      return function a(props: WrapperProps) {
        return (
          <A
            href={props.href}
            style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text, margin: 0, padding: 0 }}
          >
            {props.children}
          </A>
        )
      }
    case 'ul':
      return function ul({ children }: WrapperProps) {
        if (!children || !Array.isArray(children)) return null

        const filtered = children.filter(
          (child, index) => index !== 0 && index !== children.length - 1 && !!child && child !== '\n'
        )

        return (
          <UL
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              marginLeft: theme.styles.spacings.default * 2,
            }}
          >
            {filtered}
          </UL>
        )
      }
    case 'ol':
      return function ol({ children }: WrapperProps) {
        if (!children || !Array.isArray(children)) return null

        const filtered = children
          .filter((child, index) => index !== 0 && index !== children.length - 1 && !!child && child !== '\n')
          .map((child, index) => ({
            ...child,
            props: { ...child.props, children: `${index + 1}. ${child.props.children}` },
          }))

        return (
          <UL
            style={{
              marginVertical: 0,
              marginBottom: theme.styles.spacings.default,
              marginLeft: theme.styles.spacings.default * 2,
            }}
          >
            {filtered}
          </UL>
        )
      }
    case 'li':
      return function li({ children }: WrapperProps) {
        if (!children) return null

        if (Array.isArray(children)) {
          const filtered = children
            .filter(child => !!child && child !== '\n')
            .map((child, index) => (
              <LI
                key={index}
                style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text, marginVertical: 0 }}
              >
                {child}
              </LI>
            ))

          return (
            <LI style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text, marginVertical: 0 }}>
              {filtered}
            </LI>
          )
        }

        return (
          <LI style={{ fontSize: theme.styles.fontSize.default, color: theme.styles.colors.text, marginVertical: 0 }}>
            {children}
          </LI>
        )
      }
    case 'blockquote':
      return function blockquote({ children }: WrapperProps) {
        if (!children || !Array.isArray(children)) return null

        const filtered = children.filter(
          (child, index) => index !== 0 && index !== children.length - 1 && child !== '\n'
        )

        return <View style={{ marginLeft: theme.styles.spacings.default * 2 }}>{filtered}</View>
      }
    case 'img':
      return function img({ src, alt }: WrapperProps) {
        return <Image src={src} alt={alt} style={{ borderWidth: 1, width: 100, height: 100 }} />
      }
    case 'br':
      return function br() {
        return null
      }
    case 'span':
      return function span(props: WrapperProps) {
        if (!props.children || props.children === '\n') return null

        return <Text>{props.children}</Text>
      }
    case 'input':
      return function input(props) {
        console.log('input', props)
        return null
      }
    default:
      return () => null
  }
}
