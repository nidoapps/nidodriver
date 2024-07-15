import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
  Container,
  Form,
  Label,
  Input,
  PickerField,
  Button,
} from '@ui-kitten/components'
import { Formik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import * as yup from 'yup'

import { storage } from '@/App'
import { useDriversContext } from '@/hooks/useDriversContext'

// const initialValues = {
//   name: '',
//   lastName: '',
//   phone: '66778899',
//   licenseNumber: 'JKL765656',
//   documentNumber: 'Colegio AIP',
// }

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  phone: yup.string().required('El teléfono es obligatorio'),
  busId: yup.string().required('El ID del bus es obligatorio'),
  licensePlate: yup.string().required('La placa del vehículo es obligatoria'),
})

const EditDriverProfileScreen = () => {
  const {
    state: { driverData },
    hooks: { getDriverProfileData, updateDriverProfileData, handleSignOut },
  } = useDriversContext()
  const [driverInfo, setDriverInfo] = useState(driverData)
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      getDriverProfileData(driverData?.userId || storage.getString('userId'))
    }, [])
  )
  // useEffect(() => {
  //   getDriverProfileData(driverData?.userId || storage.getString('userId'))
  // }, [])

  const handleLogOut = async () => {
    await handleSignOut()
    setTimeout(() => {
      navigation.navigate('signIn')
    }, 250)
  }

  const handleUpdateProfile = useCallback(
    async (values) => {
      try {
        await updateDriverProfileData(values.driverId, values)
        Toast.show({
          type: 'success',
          text1: 'Perfil del conductor actualizado con éxito',
        })
        // navigation.goBack()
      } catch (error) {
        console.error('Error updating driver profile:', error)
        Toast.show({
          type: 'error',
          text1: 'Error al actualizar el perfil del conductor',
        })
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
        <View className="w-full my-8">
          <TouchableOpacity onPress={() => handleLogOut()}>
            <Text>Cerrar sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditDriverProfileScreen
