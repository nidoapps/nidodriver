import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  IconRegistry,
  ModalService,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { registerRootComponent } from 'expo'
import * as React from 'react'
import { useEffect } from 'react'
import { Appearance } from 'react-native'

import { ColorSchema } from './constants/common'
import { default as theme } from './custom-theme.json'
import { DriversAppProvider } from './hooks/useDriversContext'
import MainNavigation from './navigation/MainNavigation'
import { default as mapping } from '../mapping.json'
import './global.css'
ModalService.setShouldUseTopInsets = true

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
          <MainNavigation />
        </ApplicationProvider>
      </DriversAppProvider>
    </>
  )
}

registerRootComponent(App)
