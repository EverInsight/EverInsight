import { themeSignal } from '@/signals/theme'
import { TouchableOpacity, type TouchableOpacityProps, Text, StyleSheet } from 'react-native'

export type ButtonProps = TouchableOpacityProps & {
  title?: string
  border?: boolean
  underline?: boolean
}

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...(props.border
          ? {
              borderWidth: StyleSheet.hairlineWidth,
              padding: themeSignal.value.styles.spacings.default,
              borderColor: themeSignal.value.styles.colors.border,
            }
          : {}),
        ...(props.underline
          ? { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: themeSignal.value.styles.colors.border }
          : {}),
        ...(props.style || ({} as object)),
      }}
    >
      {props.title ? (
        <Text
          style={{
            fontSize: themeSignal.value.styles.fontSize.default,
            color: themeSignal.value.styles.colors.primary,
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
