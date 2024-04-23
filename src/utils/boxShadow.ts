import { Platform } from 'react-native'

const elevationToBoxShadow = [
  /* elevation 1  */ 'box-shadow: 0px 1px 1px rgba(0,0,0, 0.18)',
  /* elevation 2  */ 'box-shadow: 0px 1px 1.41px rgba(0,0,0, 0.20)',
  /* elevation 3  */ 'box-shadow: 0px 1px 2.22px rgba(0,0,0, 0.22)',
  /* elevation 4  */ 'box-shadow: 0px 2px 2.62px rgba(0,0,0, 0.23)',
  /* elevation 5  */ 'box-shadow: 0px 2px 3.84px rgba(0,0,0, 0.25)',
  /* elevation 6  */ 'box-shadow: 0px 3px 4.65px rgba(0,0,0, 0.27)',
  /* elevation 7  */ 'box-shadow: 0px 3px 4.65px rgba(0,0,0, 0.29)',
  /* elevation 8  */ 'box-shadow: 0px 4px 4.65px rgba(0,0,0, 0.30)',
  /* elevation 9  */ 'box-shadow: 0px 4px 5.46px rgba(0,0,0, 0.32)',
  /* elevation 10 */ 'box-shadow: 0px 5px 6.27px rgba(0,0,0, 0.34)',
  /* elevation 11 */ 'box-shadow: 0px 5px 6.68px rgba(0,0,0, 0.36)',
  /* elevation 12 */ 'box-shadow: 0px 6px 7.49px rgba(0,0,0, 0.37)',
  /* elevation 13 */ 'box-shadow: 0px 6px 8.30px rgba(0,0,0, 0.39)',
  /* elevation 14 */ 'box-shadow: 0px 7px 9.11px rgba(0,0,0, 0.41)',
  /* elevation 15 */ 'box-shadow: 0px 7px 9.51px rgba(0,0,0, 0.43)',
  /* elevation 16 */ 'box-shadow: 0px 8px 10.32px rgba(0,0,0, 0.44)',
  /* elevation 17 */ 'box-shadow: 0px 8px 11.14px rgba(0,0,0, 0.46)',
  /* elevation 18 */ 'box-shadow: 0px 9px 11.95px rgba(0,0,0, 0.48)',
  /* elevation 19 */ 'box-shadow: 0px 9px 12.35px rgba(0,0,0, 0.50)',
  /* elevation 20 */ 'box-shadow: 0px 10px 13.16px rgba(0,0,0, 0.51)',
  /* elevation 21 */ 'box-shadow: 0px 10px 13.97px rgba(0,0,0, 0.53)',
  /* elevation 22 */ 'box-shadow: 0px 11px 14.78px rgba(0,0,0, 0.55)',
  /* elevation 23 */ 'box-shadow: 0px 11px 15.19px rgba(0,0,0, 0.57)',
  /* elevation 24 */ 'box-shadow: 0px 12px 16px rgba(0,0,0, 0.58)',
]

export function buildShadow(elevation: number) {
  if (elevation < 1 || elevation > 24) {
    throw new Error('elevation api only support numbers between 1 and 24')
  }
  return Platform.select({
    android: `elevation: ${elevation};`,
    ios: elevationToBoxShadow[elevation],
  })
}
