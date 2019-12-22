import { useCallback } from 'react'

export interface UseDownloadParams {
  name: string
  data: string | Blob
  type?: string
}

export type UseDownloadReturn = (
  params: UseDownloadParams,
) => { download: () => void }

const useDownload = () => {
  const createBlobUrl = useCallback((data: Blob, type?: string) => {
    // 中文乱码
    const blob = new Blob([`\ufeff${data}`], {
      type: `${type},charset=UTF-8`,
    })
    return URL.createObjectURL(blob)
  }, [])

  const createDownloadInstance = useCallback(
    ({ data, name, type }: UseDownloadParams): { download: () => void } => {
      const link = document.createElement('a')
      link.download = name
      link.href = typeof data !== 'string' ? createBlobUrl(data, type) : data
      return {
        download: () => link.click(),
      }
    },
    [createBlobUrl],
  )

  return createDownloadInstance
}

export default useDownload
