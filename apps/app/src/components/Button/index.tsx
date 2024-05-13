import { use } from '@/context'
import { TouchableOpacity, type TouchableOpacityProps, Text, StyleSheet } from 'react-native'

export type ButtonProps = TouchableOpacityProps & {
  title?: string
  border?: boolean
  underline?: boolean
}

export function Button(props: ButtonProps) {
  const { theme } = use()

  return (
    <TouchableOpacity
      {...props}
      style={{
        ...(props.border
          ? {
              borderWidth: StyleSheet.hairlineWidth,
              padding: theme.styles.spacings.default,
              borderColor: theme.styles.colors.border,
            }
          : {}),
        ...(props.underline
          ? { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.styles.colors.border }
          : {}),
        ...(props.style || ({} as object)),
      }}
    >
      {props.title ? (
        <Text
          style={{
            fontSize: theme.styles.fontSize.default,
            color: theme.styles.colors.primary,
            textAlign: 'center',
          }}
        >
          {props.title}
        </Text>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  )
}
