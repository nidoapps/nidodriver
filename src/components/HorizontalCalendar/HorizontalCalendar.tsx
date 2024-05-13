import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import React, { useMemo } from 'react'
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native'

import { colors } from '@/themeColors'

const { width } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.12
const ITEM_HEIGHT = 70
const ITEM_OFFSET = ITEM_WIDTH + 18
interface Props {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

function dateSubtractDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

function getDayString(date: Date): string {
  return dayjs(date).locale('es', es).format('dd')
}

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate()
}

function isToday(date: Date): boolean {
  return new Date().getDate() === date.getDate()
}

function generateHorizontalCalendarDates(days: number): Date[] {
  const today = new Date()
  const result = []
  for (let i = 0; i < days; i++) {
    result[i] = dateSubtractDays(today, i)
  }

  return result.reverse()
}

const HorizontalCalendar = ({ selectedDate, setSelectedDate }: Props) => {
  const dates: Date[] = useMemo(() => {
    return generateHorizontalCalendarDates(14)
  }, [])

  const onDatePress = (date: Date) => {
    setSelectedDate(date)
  }

  const disabledDates = (date: Date): boolean => {
    return date.getDay() === 6 || date.getDay() === 0 || date > new Date()
  }

  const renderItem = ({ item, index }: { item: Date; index: number }) => {
    const dayNumber = item.getDate()
    const dayString = getDayString(item)
    const isActive = isSameDay(selectedDate, item)
    return (
      <Pressable
        disabled={disabledDates(item)}
        className={`bg-white p-1 mx-1 w-10 rounded-lg items-center ${isActive && 'bg-midblue-500 text-white p-1.5'} ${disabledDates(item) && 'opacity-50'}`}
        onPress={() => onDatePress(item)}>
        <Text style={[styles.dateOutput, isActive && styles.activeText]}>
          {dayNumber}
        </Text>
        <Text style={[styles.dayStyle, isActive && styles.activeText]}>
          {dayString}
        </Text>
      </Pressable>
    )
  }

  return (
    <View className="bg-white pt-2 mb-0 pb-0">
      <FlatList
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.toDateString()}
        horizontal
        contentContainerStyle={[
          { paddingBottom: 16, paddingLeft: 4, paddingRight: 16 },
        ]}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={dates.length - 8}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_OFFSET * index,
          index,
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dateOutput: {
    color: colors.darkGrey2,
    fontSize: 18,
    fontWeight: '400',
  },
  dayStyle: {
    color: colors.darkGrey2,
    textTransform: 'lowercase',
  },
  activeText: {
    color: colors.white,
    fontWeight: '600',
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
})

export default HorizontalCalendar
