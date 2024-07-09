export enum StopStatus {
  pending = 'pending',
  active = 'active',
  completed = 'Completed',
  scheduled = 'Scheduled',
  cancelled = 'Cancelled',
  skipped = 'Skipped',
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
