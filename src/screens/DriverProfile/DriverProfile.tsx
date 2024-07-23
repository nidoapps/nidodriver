import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Input, Button } from '@ui-kitten/components'
import { Formik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import * as yup from 'yup'

import { storage } from '@/App'
import { useDriversContext } from '@/hooks/useDriversContext'

const EditDriverProfileScreen = () => {
  const {
    state: { driverData },
    hooks: { getDriverProfileData, updateDriverProfileData, handleSignOut },
  } = useDriversContext()
  const [driverInfo, setDriverInfo] = useState(driverData)
  const [showUpdatedSuccess, setShowUpdatedSuccess] = useState(false)
  const [showUpdatedError, setShowUpdatedError] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    getDriverProfileData(driverData?.userId || storage.getString('userId'))
  }, [])

  const handleLogOut = async () => {
    await handleSignOut()
    setTimeout(() => {
      navigation.navigate('signIn')
    }, 250)
  }

  const handleUpdateProfile = useCallback(
    async (values) => {
      try {
        const response = await updateDriverProfileData(values.driverId, values)
        if (response) {
          setShowUpdatedSuccess(true)
        } else {
          setShowUpdatedError(true)
        }
      } catch (error) {
        console.error('Error updating driver profile:', error)
        setShowUpdatedError(true)
      } finally {
        setTimeout(() => {
          setShowUpdatedSuccess(false)
          setShowUpdatedError(false)
        }, 4000)
      }
    },
    [driverData]
  )

  return (
    <SafeAreaView>
      <View className="px-4 py-6 gap-y-6">
        <Text className="my-8 text-xl font-semibold">Editar perfil</Text>
        <Input
          defaultValue={driverInfo?.user?.name}
          onChangeText={(value) =>
            setDriverInfo({
              ...driverData,
              user: { ...driverInfo.user, name: value },
            })
          }
          placeholder="Ingrese el nombre del conductor"
          label="Nombre"
        />
        <Input
          defaultValue={driverInfo?.user?.lastName}
          onChangeText={(value) =>
            setDriverInfo({
              ...driverData,
              user: { ...driverInfo.user, lastName: value },
            })
          }
          placeholder="Ingrese el apellido del conductor"
          label=" Apellido"
        />

        <Input
          defaultValue={driverInfo?.user?.phone?.replace(
            /(\d{1})(\d{3})(\d{4})/,
            '$1$2-$3'
          )}
          onChangeText={(value) =>
            setDriverInfo({
              ...driverData,
              user: {
                ...driverInfo.user,
                phone: value.replace(/(\d{1})(\d{3})(\d{4})/, '$1$2-$3'),
              },
            })
          }
          placeholder="Ingrese el teléfono del conductor"
          keyboardType="number-pad"
          maxLength={8}
          label="Teléfono"
        />
        {/* <Input
          defaultValue={driverInfo.schoolName}
          onChangeText={(value) =>
            setDriverInfo({ ...driverData, phone: value })
          }
          placeholder="Ingrese el Nombre del colegio"
          label="Colegio"
        /> */}

        <Input
          defaultValue={driverInfo?.documentNumber}
          onChangeText={(value) =>
            setDriverInfo({ ...driverData, documentNumber: value })
          }
          placeholder="Ingrese el documento"
          label="Número de documento"
        />

        <Input
          defaultValue={driverInfo?.licenseNumber}
          onChangeText={(value) =>
            setDriverInfo({ ...driverData, licenseNumber: value })
          }
          placeholder="Ingrese la placa del vehículo"
          label="Placa del vehículo"
        />

        <Button
          status="primary"
          onPress={() => {
            handleUpdateProfile(driverInfo)
          }}>
          Actualizar Perfil
        </Button>

        <View className="w-full mb-0 bottom-0 items-center">
          <TouchableOpacity onPress={() => handleLogOut()}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
        {showUpdatedSuccess && (
          <View className="p-3 border border-success bg-success justify-center items-center w-full rounded-md">
            <Text className="text-lg text-white">
              Perfil actualizado correctamente
            </Text>
          </View>
        )}
        {showUpdatedError && (
          <View className="p-3 border border-error bg-error-100 justify-center items-center w-full rounded-md">
            <Text className="text-lg text-white">
              Error al actualizar perfil
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default EditDriverProfileScreen
