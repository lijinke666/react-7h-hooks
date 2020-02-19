import { useCallback, useMemo, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

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
  const [paramKeys, setParamKeys] = useState<(keyof T)[]>([])
  const urlSearchParams = useMemo(
    () => new URLSearchParams(location.search),
    [],
  )
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

  const updateLocation = useCallback(() => {
    urlSearchParams.sort()
    history.push({
      pathname,
      search: urlSearchParams.toString(),
    })
  }, [history, pathname, urlSearchParams])

  const set = useCallback(
    (values: Partial<T>) => {
      Object.keys(values).forEach(key => {
        const value = values[key]
        if (value) {
          if (Array.isArray(value)) {
            value.forEach(v => {
              urlSearchParams.append(key, v)
            })
          } else {
            urlSearchParams.set(key, (value as unknown) as string)
          }
        }
      })
      updateLocation()
    },
    [updateLocation],
  )

  const parseValue = (key: string, value: string) => {
    const { type } = getFieldByKey(key)
    let newValue: any

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
      case UseSearchParamsSchemaType.ARRAY:
        newValue = urlSearchParams.getAll(key)
        break
      default:
        break
    }
    return newValue
  }

  const deleteMany = useCallback(
    (target: (keyof T)[]) => {
      target.forEach(key => {
        urlSearchParams.delete(key as string)
      })
    },
    [urlSearchParams],
  )

  const remove = useCallback(
    (keys?: (keyof T)[]) => {
      if (!keys || !keys.length) {
        deleteMany(paramKeys)
      } else {
        deleteMany(keys)
      }
      updateLocation()
    },
    [history, updateLocation, paramKeys],
  )

  const reset = useCallback(() => {
    deleteMany(paramKeys)
    setDefaultValues()
    updateLocation()
  }, [setDefaultValues, updateLocation, paramKeys])

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
  }, [location.search])

  useEffect(() => {
    setParamKeys(Object.keys(searchParams) as (keyof T)[])
  }, [searchParams])

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
