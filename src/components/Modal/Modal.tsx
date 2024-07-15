import BottomSheet from '@gorhom/bottom-sheet'
import { Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { colors } from '@/themeColors'
import { buildShadow } from '@/utils/boxShadow'
const StyledBottomSheet = styled(BottomSheet)

interface ModalProps {
  children: React.ReactNode
  maxHeight?: number
  handleClose?: () => void
  open?: boolean
}

const Modal = ({ children, maxHeight = 60, open, handleClose }: ModalProps) => {
  const snapPoints = ['60%', '60%', `${maxHeight}%`]

  if (!open) return null

  return (
    <>
      {open && (
        <StyledBottomSheet
          index={1}
          snapPoints={snapPoints}
          className="shadow-lg border border-gray-200 rounded-lg bg-white"
          style={{
            elevation: 20,
            shadowColor: colors.black,
            shadowOffset: { width: 10, height: 40 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
          }}>
          <>
            <TouchableOpacity
              onPress={handleClose}
              className="  justify-end   items-end pr-2">
              <Icon
                name="close-outline"
                fill={colors.black}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            {children}
          </>
        </StyledBottomSheet>
      )}
    </>
  )
}

export default Modal
