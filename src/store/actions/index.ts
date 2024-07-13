import { baseAction } from './base-action'

export const SET_IS_AUTH = 'SET_IS_AUTH'
export const SET_LOADING_AUTH = 'SET_LOADING_AUTH'

export const setIsAuthAction = (payload: any) =>
  baseAction(SET_IS_AUTH, payload)

export const setLoadingAuthAction = (payload: any) => {
  return baseAction('SET_LOADING_AUTH', payload)
}
