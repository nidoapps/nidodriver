import { Icon, List, Tab, TabBar } from '@ui-kitten/components'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import { styled } from 'nativewind'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AssignedRoutesList } from '@/components/AssignedRoutesList'
import { ModalCallContacts } from '@/components/ModalCallContacts'
import { colors } from '@/themeColors'

const StyledTabBar = styled(TabBar)

const Routes = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [callStudentModal, setCallStudentModal] = useState(false)
  const [contactsData, setContactsData] = useState({
    student: '',
    contacts: [],
  })

  const datesWhitelist = [
    new Date(),
    {
      start: dayjs(new Date()).subtract(2, 'weeks').toDate(),
      end: new Date(),
    },
  ]

  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7
  }

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

      {/* <CalendarStrip
        scrollable
        minDate={dayjs(new Date()).subtract(2, 'weeks').toDate()}
        datesBlacklist={datesBlacklistFunc}
        maxDate={new Date()}
        style={{ height: 100, paddingTop: 10, paddingBottom: 5 }}
        startingDate={new Date()}
        numDaysInWeek={5}
        headerText="Fecha de Ruta"
        locale={{ name: 'es', config: es }}
        selectedDate={new Date()}
        highlightDateContainerStyle={{
          width: 50,
          backgroundColor: colors.primary,
          borderRadius: 5,
          height: 52,
        }}
        highlightDateNumberStyle={{ color: colors.white, fontWeight: '800' }}
        highlightDateNameStyle={{ color: colors.white, fontWeight: '800' }}
        dateNameStyle={{ color: colors.darkGrey, fontWeight: '200' }}
        dateNumberStyle={{ color: colors.darkGrey, fontWeight: '200' }}
        calendarHeaderStyle={{ color: colors.darkGrey, fontWeight: '200' }}
        disabledDateNameStyle={{ color: colors.darkGrey, fontWeight: '200' }}
        disabledDateNumberStyle={{ color: colors.darkGrey, fontWeight: '200' }}
      /> */}

      <View className="h-full bg-white">
        <AssignedRoutesList />
      </View>
      {callStudentModal && (
        <ModalCallContacts
          contacts={contactsData.contacts}
          open={callStudentModal}
          handleClose={() => setCallStudentModal(false)}
          studentName={contactsData.student}
        />
      )}
    </SafeAreaView>
  )
}

export default Routes
