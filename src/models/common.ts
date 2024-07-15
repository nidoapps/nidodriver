export enum StopStatus {
  inProgress = 'InProgress',
  completed = 'Completed',
  cancelled = 'Cancelled',
  skipped = 'Skipped',
  scheduled = 'Scheduled',
}

export interface IStudent {
  id: string
  name: string
  description: string
  latitude: number
  longitude: number
  phone: string
}

export interface IStop {
  id: string
  title: string
  description: string
  latitude: number
  longitude: number
  status: StopStatus
  students: IStudent[]
}
