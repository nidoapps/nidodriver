import { AxiosRequestHeaders } from 'axios'

export interface IGET {
  servicePath: string
  params?: unknown
  headers?: any
  type?: ServicesTypes
  [x: string]: unknown
}

export interface IPOST {
  servicePath: string
  data: unknown
  headers?: Partial<AxiosRequestHeaders>
  type?: ServicesTypes
  [x: string]: unknown
}

export interface IPUT {
  servicePath: string
  data: unknown
  headers?: AxiosRequestHeaders
  type?: ServicesTypes
  [x: string]: unknown
}

export interface IDELETE {
  servicePath: string
  data: unknown
  headers?: AxiosRequestHeaders
  type?: ServicesTypes
  [x: string]: unknown
}

export interface IPATCH {
  servicePath: string
  data: unknown
  headers?: AxiosRequestHeaders
  type?: ServicesTypes
  [x: string]: unknown
}

export interface IServicesTypes {
  ms?: string
  cms?: string
  custom?: string
}

export enum ServicesTypes {
  api = 'api',
  auth = 'auth',
  custom = 'custom',
}
