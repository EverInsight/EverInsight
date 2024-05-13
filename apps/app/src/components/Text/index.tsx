import { use } from '@/context'
import { Text as RText, type TextProps } from 'react-native'

export function Text(props: TextProps) {
  const { theme } = use()

  return (
    <RText
      {...props}
      style={{
        fontSize: theme.styles.fontSize.default,
        color: theme.styles.colors.text,
        ...(props.style || ({} as object)),
      }}
    />
  )
}
