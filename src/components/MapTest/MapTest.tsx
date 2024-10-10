// import Geolocation from '@react-native-community/geolocation'
// import MapboxGL, { PointAnnotation } from '@rnmapbox/maps'
// import { Icon } from '@ui-kitten/components'
// import { styled } from 'nativewind'
// import React, { useRef, useState } from 'react'
// import { View, Text, Dimensions, TouchableOpacity } from 'react-native'

// import { MPBOX_TOKEN } from '@/constants/common'
// import { colors } from '@/themeColors'
// const StyledIcon = styled(Icon)
// const COORDINATES = [
//   [-79.50705183847431, 8.976078366555404],
//   [-79.51555587470497, 8.980827022249713],
//   [-79.51378769509259, 8.985669855777013],
//   [-79.51209086344032, 8.995063725201168],
// ]

// const COORDINATESMAP = [
//   { longitude: -79.50705183847431, latitude: 8.976078366555404 },
//   { longitude: -79.51555587470497, latitude: 8.980827022249713 },
//   { longitude: -79.51378769509259, latitude: 8.985669855777013 },
//   { longitude: -79.51209086344032, latitude: 8.995063725201168 },
// ]

// const formatCoordinates = (coordinates) =>
//   coordinates
//     .map((coordinate) => {
//       const [latitude, longitude] = coordinate
//       return `${latitude},${longitude}`
//     })
//     .join(';')
//     .replace(/[\s\n]/g, '')

// function makeRouterFeature(coordinates): any {
//   const routerFeature = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'LineString',
//           coordinates,
//         },
//       },
//     ],
//   }
//   return routerFeature
// }

// const MapTest = () => {
//   const [routeCoordinates, setRouteCoordinates] = useState()
//   const [destinationCoords, setDestinationCoords] = useState([])

//   async function createRouterLine(coords, routeProfile: string): Promise<void> {
//     const formattedCoordinates = formatCoordinates(COORDINATES)

//     const geometries = 'geojson'
//     const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${formattedCoordinates}?geometries=geojson&steps=true&banner_instructions=true&overview=full&access_token=${MPBOX_TOKEN}`

//     try {
//       const response = await fetch(url)
//       const json = await response.json()

//       const coordinates = json['routes'][0]['geometry']['coordinates']
//       const destinationCoordinates =
//         json['routes'][0]['geometry']['coordinates'].slice(-1)[0]
//       setDestinationCoords(destinationCoordinates)
//       if (coordinates.length) {
//         const routerFeature = makeRouterFeature([...coordinates])
//         setRouteCoordinates(routerFeature)
//       }
//     } catch (e) {
//       // console.log(e)
//     }
//   }

//   React.useEffect(() => {
//     createRouterLine([], 'driving-traffic')
//   }, [])

//   React.useEffect(() => {
//     async function fetchRoute() {
//       try {
//         const response = await fetchRouteFromMapbox()
//         // const routeCoordinates = response.routes[0].geometry.coordinates.map(
//         //   (e, i) => ({
//         //     longitude: e[0],
//         //     latitude: e[1],
//         //   })
//         // )
//         setRouteCoordinates(
//           makeRouterFeature(response.routes[0].geometry.coordinates)
//         )
//         // setRouteCoordinates(routeCoordinates)
//       } catch (error) {
//         console.error('Error fetching route:', error)
//       }
//     }

//     // fetchRoute()
//   }, [])

//   const fetchRouteFromMapbox = async () => {
//     const stops = formatCoordinates(COORDINATES)

//     const response = await fetch(
//       `https://api.mapbox.com/directions/v5/mapbox/driving/${stops}?geometries=geojson&steps=true&waypoints_per_route=true&access_token=${MPBOX_TOKEN}`,
//       {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     return await response.json()
//   }

//   return (
//     <View className="h-1/2 bg-black p-0 m-0">
//       <MapboxGL.MapView
//         style={{ flex: 1 }}
//         styleURL={MapboxGL.StyleURL.Outdoors}>
//         <MapboxGL.Camera
//           minZoomLevel={10}
//           maxZoomLevel={20}
//           zoomLevel={13}
//           centerCoordinate={COORDINATES[2]}
//           animationDuration={1}
//         />
//         {COORDINATES.map((coordinate, index) => (
//           <PointAnnotation
//             snippet={String(index)}
//             key={String(index)}
//             id="point"
//             coordinate={coordinate}>
//             <View className="flex items-center justify-center">
//               <StyledIcon name="pin" fill={colors.error} className="h-8 w-8" />
//               <Text className=" font-semibold ">JP</Text>
//             </View>
//           </PointAnnotation>
//         ))}
//         <MapboxGL.ShapeSource id="line1" shape={routeCoordinates}>
//           <MapboxGL.LineLayer
//             id="routerLine01"
//             style={{
//               lineColor: colors.blue,
//               lineWidth: 5,
//               lineCap: 'round',
//             }}
//             layerIndex={100}
//           />
//         </MapboxGL.ShapeSource>
//         {/* {destinationCoords.length > 0 && (
//     <MapboxGL.PointAnnotation
//       title="Test"
//       id="pointDestination"
//       coordinate={destinationCoords}>
//       <View className=" items-center justify-center ">
//         <StyledIcon
//           name="home"
//           fill={colors.primary}
//           className="h-7 w-7"
//           stroke={colors.darkGrey}
//         />
//       </View>
//     </MapboxGL.PointAnnotation>
//   )}  */}
//       </MapboxGL.MapView>
//     </View>
//   )
// }

// export default MapTest
// // <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Street}>
// //   <MapboxGL.Camera
// //     minZoomLevel={10}
// //     maxZoomLevel={20}
// //     zoomLevel={13}
// //     centerCoordinate={COORDINATES[2]}
// //     animationDuration={1}
// //   />
// //   {COORDINATES.map((coordinate, index) => (
// //     <PointAnnotation
// //       snippet={String(index)}
// //       key={String(index)}
// //       id="point"
// //       coordinate={coordinate}>
// //       <View>
// //         <StyledIcon name="pin" fill={colors.error} className="h-8 w-8" />
// //         <Text className=" font-semibold ">JP</Text>
// //       </View>
// //     </PointAnnotation>
// //   ))}
// //   <MapboxGL.ShapeSource id="line1" shape={routeCoordinates}>
// //     <MapboxGL.LineLayer
// //       id="routerLine01"
// //       style={{
// //         lineColor: colors.blue,
// //         lineWidth: 6,
// //         lineCap: 'round',
// //       }}
// //       //   layerIndex={100}
// //     />
// //   </MapboxGL.ShapeSource>
// //   {/* {destinationCoords.length > 0 && (
// //     <MapboxGL.PointAnnotation
// //       title="Test"
// //       id="pointDestination"
// //       coordinate={destinationCoords}>
// //       <View className=" items-center justify-center ">
// //         <StyledIcon
// //           name="home"
// //           fill={colors.primary}
// //           className="h-7 w-7"
// //           stroke={colors.darkGrey}
// //         />
// //       </View>
// //     </MapboxGL.PointAnnotation>
// //   )} */}

// // </MapboxGL.MapView>
// // GOOGLE MAPS INTEGRATION
// /* <MapView
//         style={{
//           width: Dimensions.get('screen').width,
//           height: Dimensions.get('screen').height / 3,
//         }}
//         initialRegion={{
//           latitude: COORDINATESMAP[0].latitude,
//           longitude: COORDINATESMAP[0].longitude,
//           latitudeDelta: 0.0622,
//           longitudeDelta: 0.0121,
//         }}>
//         {routeCoordinates && (
//           <MapViewDirections
//             origin={COORDINATESMAP[0]}
//             destination={COORDINATESMAP[COORDINATESMAP.length - 1]}
//             apikey="AIzaSyDN0UV53JKbNOCSvPYlyMDeVwynC-Hk3o0"
//             strokeWidth={7}
//             strokeColors={[colors.blue]}
//             waypoints={COORDINATESMAP.slice(1, -1)}
//             mode="DRIVING"
//             resetOnChange
//             optimizeWaypoints
//             precision="high"
//           />
//         )}
//         {COORDINATESMAP.map((coordinate, index) => (
//           <Marker key={index} coordinate={COORDINATESMAP[index]} />
//         ))}
//         {/* <Polyline
//           coordinates={routeCoordinates}
//           strokeColor="#000"
//           strokeColors={[colors.blue]}
//           strokeWidth={8}
//           geodesic
//         />
//       </MapView> */
