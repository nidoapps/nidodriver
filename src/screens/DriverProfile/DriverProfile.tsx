import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Form,
  Label,
  Input,
  PickerField,
  Button,
} from '@ui-kitten/components'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import * as yup from 'yup'

const initialValues = {
  name: 'Ninfa Rodriguez',
  phone: '66778899',
  schoolPlate: 'YH83787',
  licensePlate: 'JKL765656',
  schoolName: 'Colegio AIP',
}

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  phone: yup.string().required('El teléfono es obligatorio'),
  busId: yup.string().required('El ID del bus es obligatorio'),
  licensePlate: yup.string().required('La placa del vehículo es obligatoria'),
})

const EditDriverProfileScreen = () => {
  const [driverData, setDriverData] = useState(initialValues)
  const navigation = useNavigation()

  const handleUpdateProfile = async (values) => {
    try {
      // Implement API call to update driver profile with `values`
      console.log('Updating driver profile:', values)
      Toast.show({
        type: 'success',
        text1: 'Perfil del conductor actualizado con éxito',
      })
      navigation.goBack()
    } catch (error) {
      console.error('Error updating driver profile:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar el perfil del conductor',
      })
    }
  }

  return (
    <SafeAreaView>
      <View className="px-4 py-6 gap-y-6">
        <Text className="my-8 text-xl font-semibold">Editar perfil</Text>
        <Input
          defaultValue={initialValues.name}
          onChangeText={(value) =>
            setDriverData({ ...driverData, name: value })
          }
          placeholder="Ingrese el nombre del conductor"
          label="Nombre y Apellido"
        />

        <Input
          defaultValue={initialValues.phone.replace(
            /(\d{1})(\d{3})(\d{4})/,
            '$1$2-$3'
          )}
          onChangeText={(value) =>
            setDriverData({
              ...driverData,
              phone: value.replace(/(\d{1})(\d{3})(\d{4})/, '$1$2-$3'),
            })
          }
          placeholder="Ingrese el teléfono del conductor"
          keyboardType="number-pad"
          maxLength={8}
          label="Teléfono"
        />
        <Input
          defaultValue={initialValues.schoolName}
          onChangeText={(value) =>
            setDriverData({ ...driverData, phone: value })
          }
          placeholder="Ingrese el Nombre del colegio"
          label="Colegio"
        />

        <Input
          defaultValue={initialValues.schoolPlate}
          onChangeText={(value) =>
            setDriverData({ ...driverData, schoolPlate: value })
          }
          placeholder="Ingrese la placa escolar"
          label="Placa escolar"
        />

        <Input
          defaultValue={initialValues.licensePlate}
          onChangeText={(value) =>
            setDriverData({ ...driverData, licensePlate: value })
          }
          placeholder="Ingrese la placa del vehículo"
          label="Placa del vehículo"
        />

        <Button
          status="primary"
          onPress={() => {
            handleUpdateProfile(driverData)
          }}>
          Actualizar Perfil
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default EditDriverProfileScreen
