import * as eva from '@eva-design/eva'
import MapboxGL from '@rnmapbox/maps'
import {
  ApplicationProvider,
  IconRegistry,
  ModalService,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { OneSignal } from 'react-native-onesignal'

import { ColorSchema } from './constants/common'
import { default as theme } from './custom-theme.json'
import { DriversAppProvider } from './hooks/useDriversContext'
import MainNavigation from './navigation/MainNavigation'
import { default as mapping } from '../mapping.json'

import './global.css'

export const storage = new MMKV()

ModalService.setShouldUseTopInsets = true

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZGF2aWRlZ2QiLCJhIjoiY2x1cmpzcHR5MDg4dzJxbng2bnZjaDd6NyJ9.HhUONFQ9j0HeA9Sjahlgtg'
)

OneSignal.initialize('738993bd-0285-41fe-9eff-33ac439c213e')
OneSignal.Notifications.requestPermission(true)
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('OneSignal: notification clicked:', event)
})
export default function App() {
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme()
  )

  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      setColorScheme(Appearance.getColorScheme())
      Appearance.setColorScheme(Appearance.getColorScheme())
    })

    return () => subscription.remove()
  }, [Appearance.getColorScheme(), setColorScheme])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <DriversAppProvider>
        <ApplicationProvider
          {...eva}
          customMapping={mapping}
          theme={{ ...eva[colorScheme as ColorSchema], ...theme }}>
          <StatusBar style="dark" />
          <MainNavigation />
        </ApplicationProvider>
      </DriversAppProvider>
    </>
  )
}

registerRootComponent(App)
