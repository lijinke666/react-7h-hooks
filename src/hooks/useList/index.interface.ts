export interface UseListOptions {
  title?: string | React.ReactNode | FunctionTitle
  count?: number
  rememberIndex?: boolean
}
export type FunctionTitle = (
  id?: string,
  index?: number,
) => string | React.ReactNode
