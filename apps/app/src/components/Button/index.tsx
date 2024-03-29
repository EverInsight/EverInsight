import { themeSignal } from '@/signals/theme'
import { TouchableOpacity, type TouchableOpacityProps, Text } from 'react-native'

export type ButtonProps = TouchableOpacityProps & {
  title: string
}

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={{ fontSize: themeSignal.value.styles.fontSize.default, color: themeSignal.value.styles.colors.primary }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
