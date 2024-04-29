import React, { createContext, useContext } from 'react'

import { useDriversStore } from './useDriversStore'

const DriversContext = createContext({} as any)

export const DriversAppProvider = ({ children }: any) => {
  const value = useDriversStore()
  return (
    <DriversContext.Provider value={value as any}>
      {children}
    </DriversContext.Provider>
  )
}

export const useDriversContext = () => {
  const context = useContext(DriversContext)
  return context
}
