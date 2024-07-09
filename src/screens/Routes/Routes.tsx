import { Spinner, Tab, TabBar } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AssignedRoutesList } from '@/components/AssignedRoutesList'
import { HorizontalCalendar } from '@/components/HorizontalCalendar'
import { TripDirection } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'

const StyledTabBar = styled(TabBar)

const Routes = () => {
  const {
    hooks: { getHistoryTripsByDriverId },
    state: { historyTrips, loadingHistoryTrips, driverData },
  } = useDriversContext()
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedDate, setselectedDate] = useState(new Date())

  useEffect(() => {
    getHistoryTripsByDriverId(
      driverData.driverId,
      `${selectedDate.toISOString().split('T')[0]}T00:00:00.000Z`,
      selectedTab === 0 ? TripDirection.going : TripDirection.return
    )
  }, [selectedTab, selectedDate])

  console.log(selectedDate)

  const TopTabBar = useCallback(
    () => (
      <StyledTabBar
        className="py-4"
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}>
        <Tab title="Rutas de Ida" />
        <Tab title="Rutas de Vuelta" />
      </StyledTabBar>
    ),
    [selectedTab]
  )

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopTabBar />
      <HorizontalCalendar
        selectedDate={selectedDate}
        setSelectedDate={(date) => setselectedDate(date)}
      />
      {loadingHistoryTrips ? <Spinner /> : null}
      {historyTrips && <AssignedRoutesList />}
    </SafeAreaView>
  )
}

export default Routes
