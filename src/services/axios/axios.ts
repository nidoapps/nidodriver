import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  HeadersDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import axiosRetry from 'axios-retry'

import { IGET, IPATCH, IPOST, IPUT, ServicesTypes } from './axios.interface'

import { storage } from '@/App'

const API_URL = 'https://nidoapp-a3672380868e.herokuapp.com/'

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (e: AxiosError): any =>
    e.config &&
    e.config.method === 'get' &&
    axiosRetry.isNetworkOrIdempotentRequestError(e),
})

axios.defaults.headers = {
  common: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  get: {},
  post: {},
  delete: {},
  put: {},
  patch: {},
  head: {},
} as HeadersDefaults & { [key: string]: any }

axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  return config
})

const serviceType = (
  type: ServicesTypes = ServicesTypes.api
): string | undefined => {
  if (!type) return API_URL

  const types = {
    [ServicesTypes.api]: API_URL,
    [ServicesTypes.custom]: '',
    [ServicesTypes.auth]: API_URL,
  }

  return types[type]
}

const callService = <T>(call: AxiosRequestConfig): Promise<T> => {
  return (async (): Promise<T> => {
    const authToken =
      storage.getString('authToken') || process.env.EXPO_PUBLIC_AUTH_TOKEN
    if (authToken) {
      call.headers = {
        ...call.headers,
        Authorization: `Bearer ${authToken}`,
      }
    }
    try {
      const response = await axios(call)
      return response.data
    } catch (error) {
      const response = error.response ? error.response : error
      throw error({
        ...response,
        statusCode: (response && response.status) || 404,
      })
    }
  })()
}

export const get = <T>({
  servicePath,
  params,
  headers,
  type,
  ...rest
}: IGET): Promise<T> =>
  callService({
    method: 'GET',
    url: `${serviceType(type)}${servicePath}`,
    headers,
    params,
    ...rest,
  })

export const post = <T>({
  servicePath,
  data,
  headers,
  type,
  ...rest
}: IPOST): Promise<T> =>
  callService({
    method: 'POST',
    url: `${serviceType(type)}${servicePath}`,
    headers,
    data,
    ...rest,
  })

export const patch = <T>({
  servicePath,
  data,
  headers,
  type,
  ...rest
}: IPATCH): Promise<T> =>
  callService({
    method: 'PATCH',
    url: `${serviceType(type)}${servicePath}`,
    headers,
    data,
    ...rest,
  })

export const put = <T>({
  servicePath,
  data,
  headers,
  type,
  ...rest
}: IPUT): Promise<T> =>
  callService({
    method: 'PUT',
    url: `${serviceType(type)}${servicePath}`,
    headers,
    data,
    ...rest,
  })
