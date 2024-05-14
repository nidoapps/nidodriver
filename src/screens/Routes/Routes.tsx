import { Tab, TabBar } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AssignedRoutesList } from '@/components/AssignedRoutesList'
import { HorizontalCalendar } from '@/components/HorizontalCalendar'

const StyledTabBar = styled(TabBar)

const Routes = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedDate, setselectedDate] = useState(new Date())

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

      <AssignedRoutesList />
    </SafeAreaView>
  )
}

export default Routes
