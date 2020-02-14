import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

// TODO: 支持数组

export interface UseSearchParamsParams {
  schema: UseSearchParamsSchema
  pathname?: string
}

// like mongoose
export interface UseSearchParamsSchema {
  [key: string]: UseSearchParamsSchemaDetail | string
}

export interface UseSearchParamsSchemaDetail {
  type: string
  default: string | Array<any> | number | boolean
}

export interface UseSearchParamsReturn<T> {
  searchParams: T
  remove: (keys?: Array<keyof T>) => void
  set: (values: Partial<T>) => void
}

export enum UseSearchParamsSchemaType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  ARRAY = 'ARRAY',
  BOOLEAN = 'BOOLEAN',
}

const useSearchParams = <T extends {}>({
  schema,
  pathname,
}: UseSearchParamsParams): UseSearchParamsReturn<T> => {
  const history = useHistory()
  const location = useLocation()
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])
  const _pathname = pathname || location.pathname

  const set = useCallback(
    (values: Partial<T>) => {
      const hasDefaultValues = Object.keys(schema).reduce((obj, key) => {
        const defaultValue =
          Object.is(typeof schema[key], 'object') &&
          (schema[key] as UseSearchParamsSchemaDetail).default
        if (defaultValue) {
          obj[key] = defaultValue
        }
        return obj
      }, {})

      const mergedValues = {
        ...hasDefaultValues,
        ...values,
      }
      Object.keys(mergedValues).forEach(key => {
        const value = mergedValues[key]
        if (value) {
          urlSearchParams.set(key, (value as unknown) as string)
        }
      })
      history.push({
        pathname: _pathname,
        search: urlSearchParams.toString(),
      })
    },
    [history],
  )

  const parseValue = (key: string, value: string) => {
    const { type, default: defaultValue } = Object.is(
      typeof schema[key],
      'object',
    )
      ? (schema[key] as UseSearchParamsSchemaDetail)
      : { type: schema[key], default: '' }

    let newValue
    switch (type) {
      case UseSearchParamsSchemaType.STRING:
        newValue = value !== 'undefined' ? String(value) : defaultValue
        break
      case UseSearchParamsSchemaType.NUMBER:
        newValue = value ?? Number(value)
        break
      case UseSearchParamsSchemaType.BOOLEAN:
        newValue = value === 'true'
        break
      default:
        break
    }
    return newValue
  }

  const searchParams = useMemo(() => {
    const parsedSearchParams = {}
    const schemaKeys = Object.keys(schema)
    urlSearchParams.forEach((value, key) => {
      const isValidKey = schemaKeys.includes(key)
      if (isValidKey) {
        const parsedValue = parseValue(key, value)
        parsedSearchParams[key] = parsedValue
      }
    })
    return parsedSearchParams as T
  }, [location.search, urlSearchParams])

  const remove = useCallback(
    (keys?: Array<keyof T>) => {
      if (!keys || !keys.length) {
        urlSearchParams.forEach((_, key) => {
          urlSearchParams.delete(key)
        })
      } else {
        keys.forEach(key => {
          urlSearchParams.delete(key as string)
        })
      }
      history.push({
        pathname: _pathname,
        search: urlSearchParams.toString(),
      })
    },
    [history],
  )

  return {
    searchParams,
    set,
    remove,
  }
}

export default useSearchParams
