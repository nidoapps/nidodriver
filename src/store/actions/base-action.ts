export interface ActionType {
  type: string
  payload?: any | unknown
}
export const baseAction = (type: string, payload?: unknown): ActionType => ({
  type,
  payload,
})
