import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// import MapTest from '@/components/MapTest/MapTest'
import { AssignedTrips } from '@/mocks/stops'
import { RootStackParams } from '@/navigation/NavigationParams'

interface StudentDetailProps {
  route: RouteProp<RootStackParams, 'studentDetail'>
}
const StudentDetail = ({ route }: StudentDetailProps) => {
  const { stopId } = route.params || {}

  const { students, holdTime, status, latitude, longitude } =
    AssignedTrips[0].stops.find((stop) => stop.id === stopId) || { holdTime: 3 }

  return <>{/* <MapTest /> */}</>
}

export default StudentDetail
