import { StyleSheet } from 'react-native'

import { colors } from '@/themeColors'

export const styles = StyleSheet.create({
  input: {
    marginVertical: 15,
  },
  linkContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  link: {
    color: colors.light.primary,
    textDecorationLine: 'none',
  },
})
