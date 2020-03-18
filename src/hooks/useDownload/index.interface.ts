export type UseDownloadFileType = 'text' | 'json' | 'url'

export interface UseDownloadOptions {
  name: string
  data: any
  type?: UseDownloadFileType
}
