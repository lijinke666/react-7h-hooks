import { useCallback, useMemo, useEffect } from 'react'
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
  reset: () => void
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
  pathname: _pathname,
}: UseSearchParamsParams): UseSearchParamsReturn<T> => {
  const history = useHistory()
  const location = useLocation()
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])
  const pathname = _pathname || location.pathname

  const getFieldByKey = useCallback((key: string) => {
    const { type, default: defaultValue } = Object.is(
      typeof schema[key],
      'object',
    )
      ? (schema[key] as UseSearchParamsSchemaDetail)
      : { type: schema[key], default: null }
    return {
      type,
      defaultValue,
    }
  }, [])

  const getDefaultValues = useCallback(() => {
    return Object.keys(schema).reduce((obj, key) => {
      const { defaultValue } = getFieldByKey(key)
      if (defaultValue) {
        obj[key] = defaultValue
      }
      return obj
    }, {})
  }, [schema])

  const defaultValues = useMemo(getDefaultValues, [])

  const setDefaultValues = useCallback(() => {
    Object.keys(defaultValues).forEach(key => {
      urlSearchParams.set(key, defaultValues[key])
    })
  }, [defaultValues])

  const set = useCallback(
    (values: Partial<T>) => {
      const mergedValues = {
        ...defaultValues,
        ...values,
      }
      Object.keys(mergedValues).forEach(key => {
        const value = mergedValues[key]
        if (value) {
          urlSearchParams.set(key, (value as unknown) as string)
        }
      })
      history.push({
        pathname,
        search: urlSearchParams.toString(),
      })
    },
    [history, defaultValues],
  )

  const parseValue = (key: string, value: string) => {
    const { type } = getFieldByKey(key)
    let newValue

    switch (type) {
      case UseSearchParamsSchemaType.STRING:
        newValue = value !== 'undefined' ? String(value) : ''
        break
      case UseSearchParamsSchemaType.NUMBER:
        newValue = Number(value)
        break
      case UseSearchParamsSchemaType.BOOLEAN:
        newValue = value === 'true'
        break
      default:
        break
    }
    return newValue
  }

  const updateLocation = useCallback(() => {
    urlSearchParams.sort()
    history.push({
      pathname,
      search: urlSearchParams.toString(),
    })
  }, [history, pathname])

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
      updateLocation()
    },
    [history, updateLocation],
  )

  const reset = useCallback(() => {
    urlSearchParams.forEach((_, key) => {
      urlSearchParams.delete(key)
    })
    setDefaultValues()
    updateLocation()
  }, [setDefaultValues, updateLocation])

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
  }, [location.search, defaultValues])

  useEffect(() => {
    setDefaultValues()
    updateLocation()
  }, [updateLocation, setDefaultValues])

  return {
    searchParams,
    set,
    remove,
    reset,
  }
}

export default useSearchParams
