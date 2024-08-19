export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export const ASC = 'asc'
export const DESC = 'desc'

export type SortBy = typeof ASC | typeof DESC

export interface SWRResponse<T> {
  isLoading: boolean
  data: T | undefined
  error: string | null
}
