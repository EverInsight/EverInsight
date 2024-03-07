// from https://github.com/expo/expo/blob/main/packages/html-elements/src/css/units.ts
import { PixelRatio } from 'react-native'

export function em(value: number): number {
  return PixelRatio.roundToNearestPixel(PixelRatio.getFontScale() * 14 * value)
}
