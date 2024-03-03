import { evaluateMdx } from '@everinsight/mdx'
import { Text } from 'react-native'

export function Mdx(props: { content: string }) {
  const Content = evaluateMdx(props.content)

  return (
    <Content
      components={{
        p: ({ children }: any) => {
          console.log('p', children)
          return <Text>{children}</Text>
        },
        h1: ({ children }: any) => {
          console.log('h1', children)
          return <Text>{children}</Text>
        },
      }}
    />
  )
}
