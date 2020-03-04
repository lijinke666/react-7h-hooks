import { useCallback } from 'react'

type UseDownloadFileType = 'text' | 'json' | 'url'

export interface UseDownloadParams {
  name: string
  data: any
  type?: UseDownloadFileType
}

export type UseDownloadReturn = (
  params: UseDownloadParams,
) => { download: () => void }

const getTextUrl = (data: string) => {
  const blob = new Blob([`\ufeff${data}`], {
    type: 'charset=UTF-8',
  })
  return URL.createObjectURL(blob)
}

const getJSONUrl = (data: object) => {
  const blob = new Blob([`\ufeff${JSON.stringify(data, undefined, 2)}`], {
    type: 'application/json,charset=UTF-8',
  })
  return URL.createObjectURL(blob)
}

const getLinkUrl = async (src: string) => {
  const data = await fetch(src).then(res => res.blob())
  return URL.createObjectURL(data)
}

const useDownload = () => {
  const createBlobUrl = useCallback((data: any, type?: UseDownloadFileType) => {
    let url = ''
    switch (type) {
      case 'text':
        url = getTextUrl(data)
        break
      case 'json':
        url = getJSONUrl(data)
        break
      default:
        break
    }
    return url
  }, [])

  const createDownloadInstance = useCallback(
    ({ data, name, type }: UseDownloadParams): { download: () => void } => {
      if (!data) {
        throw new Error('[createDownloadInstance]: invalid data!')
      }
      const link = document.createElement('a')
      link.style.display = 'none'
      link.download = name
      if (type === 'url') {
        getLinkUrl(data).then(src => {
          link.href = src
        })
      } else {
        link.href = createBlobUrl(data, type)
      }
      document.body.appendChild(link)
      return {
        download: () => {
          setTimeout(() => {
            link.click()
            link.remove()
          }, 1000)
        },
      }
    },
    [createBlobUrl],
  )

  return createDownloadInstance
}

export default useDownload
