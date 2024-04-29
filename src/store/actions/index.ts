import { baseAction } from './base-action'

export const SET_IS_AUTH = 'SET_IS_AUTH'

export const setIsAuthAction = (payload: any) =>
  baseAction(SET_IS_AUTH, payload)
