// import React from 'react'
// import {
//   createStackNavigator,
//   StackCardInterpolationProps,
// } from '@react-navigation/stack'
// import { Platform } from 'react-native'
// import MainNavigation from './MainNavigation'
// const Stack = createStackNavigator()

// const StackNavigation = () => {
//   return (
//     <Stack.Navigator
//       mode="modal"
//       screenOptions={{
//         headerShown: false,
//         gestureResponseDistance: { vertical: 1000 },
//         ...Platform.select({
//           ios: {
//             cardStyle: { backgroundColor: '#6C6C6CA4' },
//           },
//           android: {
//             cardStyle: { backgroundColor: 'transparent' },
//             cardOverlayEnabled: true,
//             cardStyleInterpolator: ({
//               current: { progress },
//             }: StackCardInterpolationProps) => ({
//               cardStyle: {
//                 opacity: progress.interpolate({
//                   inputRange: [0, 0.5, 0.9, 1],
//                   outputRange: [0, 0.25, 0.7, 1],
//                 }),
//               },
//               overlayStyle: {
//                 opacity: progress.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0, 0.5],
//                   extrapolate: 'clamp',
//                 }),
//               },
//             }),
//           },
//         }),
//       }}>
//       <Stack.Screen name="mainStack" component={MainNavigation} />
//     </Stack.Navigator>
//   )
// }

// export default StackNavigation
