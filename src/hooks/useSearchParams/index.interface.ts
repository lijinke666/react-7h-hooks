export interface UseSearchParamsOptions {
  schema: UseSearchParamsSchema
  pathname?: string
}
// like mongoose
export interface UseSearchParamsSchema {
  [key: string]: UseSearchParamsSchemaDetail | string
}
export interface UseSearchParamsSchemaDetail {
  type: string
  default: any
}
export interface UseSearchParamsReturn<T> {
  searchParams: T
  remove: (keys?: Array<keyof T>) => void
  reset: () => void
  set: (values: Partial<T>) => void
}
export enum UseSearchParamsSchemaType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  ARRAY = 'ARRAY',
  BOOLEAN = 'BOOLEAN',
}
