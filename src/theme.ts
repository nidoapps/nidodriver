import * as eva from '@eva-design/eva'
import { Appearance } from 'react-native'

import { ColorSchema } from './constants/common'
import { colors, darkContrast, lightContrast, themeColors } from './themeColors'

const contrast = {
  [ColorSchema.light]: lightContrast,
  [ColorSchema.dark]: darkContrast,
}

export const getThemeColors = (colorScheme: ColorSchema) => {
  return {
    ...eva[colorScheme].colors,
    ...colors[colorScheme],
  }
}

export const buildTheme = (colorScheme: ColorSchema) => {
  return {
    colors: getThemeColors(colorScheme),
    ...contrast[colorScheme],
  }
}

export { themeColors }

export const theme = buildTheme(Appearance.getColorScheme() as ColorSchema)
