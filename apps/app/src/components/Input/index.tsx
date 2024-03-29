import { themeSignal } from '@/signals/theme'
import { TextInput, type TextInputProps } from 'react-native'

export function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={{
        fontSize: themeSignal.value.styles.fontSize.default,
        color: themeSignal.value.styles.colors.text,
        ...(props.style || ({} as object)),
      }}
    />
  )
}
