import { themeSignal } from '@/signals/theme'
import { Text as RText, type TextProps } from 'react-native'

export function Text(props: TextProps) {
  return (
    <RText
      {...props}
      style={{
        fontSize: themeSignal.value.styles.fontSize.default,
        color: themeSignal.value.styles.colors.text,
        ...(props.style || ({} as object)),
      }}
    />
  )
}
