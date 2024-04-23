import { Dimensions } from 'react-native'
import type { EdgeInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

const ridesData: any = [
  {
    data: new Array(8).fill({
      title: 'Title for Item',
      description: 'Description for Item',
    }),
  },
]

const { height } = Dimensions.get('screen')

export const rideSheetSnapPoints = (insets: EdgeInsets) => {
  const footerHeight = scale(120) + (insets.bottom || scale(10))
  const itemHeight = scale(85)
  const headerHeight = scale(50) + 24

  return [
    footerHeight + itemHeight + headerHeight,
    footerHeight + headerHeight + ridesData[0].data.length * itemHeight,
    height - insets.top,
  ]
}

export const mapRideSheetIndexToMapPadding = [
  height * 0.3,
  height * 0.45,
  height * 0.45,
]
