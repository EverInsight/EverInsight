import { use } from '@/context'
import { TextInput, type TextInputProps } from 'react-native'

export function Input(props: TextInputProps) {
  const { theme } = use()

  return (
    <TextInput
      {...props}
      style={{
        fontSize: theme.styles.fontSize.default,
        color: theme.styles.colors.text,
        ...(props.style || ({} as object)),
      }}
    />
  )
}
