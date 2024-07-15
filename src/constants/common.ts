export enum ColorSchema {
  light = 'light',
  dark = 'dark',
}

export enum StudentStopStatus {
  pickedUp = 'PickedUp',
  cancelled = 'Cancelled',
  scheduled = 'Scheduled',
}

export enum StopStatus {
  pending = 'pending',
  active = 'active',
  completed = 'completed',
}

export enum TripStatus {
  inProgress = 'InProgress',
  completed = 'Completed',
  scheduled = 'Scheduled',
  cancelled = 'Cancelled',
}

export const MPBOX_TOKEN =
  'pk.eyJ1IjoiZGF2aWRlZ2QiLCJhIjoiY2x1cmpzcHR5MDg4dzJxbng2bnZjaDd6NyJ9.HhUONFQ9j0HeA9Sjahlgtg'

export enum SignInTypes {
  email = 'email',
  phoneNumber = 'phoneNumber',
  google = 'google',
}

export enum TripDirection {
  going = 'going',
  return = 'return',
}

export const TripDirectionText = {
  [TripDirection.going]: 'common.going',
  [TripDirection.return]: 'common.return',
}
