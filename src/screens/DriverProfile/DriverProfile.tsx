import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Input, Button, TabBar, Tab } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { storage } from '@/App'
import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
const StyledTabBar = styled(TabBar)

const EditDriverProfileScreen = () => {
  const {
    state: { driverData },
    hooks: { getDriverProfileData, updateDriverProfileData, handleSignOut },
  } = useDriversContext()
  const [driverInfo, setDriverInfo] = useState(driverData)
  const [showUpdatedSuccess, setShowUpdatedSuccess] = useState(false)
  const [showUpdatedError, setShowUpdatedError] = useState(false)
  const navigation = useNavigation()
  const [selectedTab, setSelectedTab] = useState(0)
  useEffect(() => {
    getDriverProfileData(storage.getString('userId'))
  }, [])

  useFocusEffect(
    useCallback(() => {
      getDriverProfileData(storage.getString('userId'))
    }, [])
  )

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
        getDriverProfileData(storage.getString('userId'))
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

  const TopTabBar = useCallback(
    () => (
      <StyledTabBar
        className="py-4"
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}>
        <Tab title="Perfil" />
        <Tab title="Vehículo" />
      </StyledTabBar>
    ),
    [selectedTab]
  )

  return (
    <SafeAreaView>
      <TopTabBar />
      <View className="flex   justify-between">
        <View className="">
          {!selectedTab ? (
            <ScrollView className="px-4 py-8 gap-y-4">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className=" text-xl font-semibold">Editar perfil</Text>
                </View>
              </View>
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
                placeholder="Ingrese el número de licencia"
                label="Número de licencia"
              />

              <Button
                status="primary"
                onPress={() => {
                  handleUpdateProfile(driverInfo)
                }}>
                Actualizar Perfil
              </Button>

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
            </ScrollView>
          ) : (
            <View className="pt-4 mb-3 px-4 h-3/4">
              <Text className="text-lg my-4 font-semibold">
                {t('profile.assignedVehicle')}
              </Text>
              <View className="flex  gap-2 justify-between">
                <Text className="text-base text-neutral-700 ">
                  {t('profile.model')}: {driverData?.vehicle?.model}
                </Text>
                <Text className="text-base text-neutral-700 ">
                  {t('profile.color')}: {driverData?.vehicle?.color}
                </Text>
                <Text className="text-base text-neutral-700 ">
                  {t('profile.capacity')}: {driverData?.vehicle?.capacity}
                </Text>
                <Text className="text-base text-neutral-700 ">
                  {t('profile.plate')}: {driverData?.vehicle?.plate}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View className=" flex items-center justify-end pb-3 ">
          <TouchableOpacity onPress={() => handleLogOut()}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditDriverProfileScreen
