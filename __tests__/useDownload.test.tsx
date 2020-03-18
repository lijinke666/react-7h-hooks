import { renderHook } from '@testing-library/react-hooks'
import { useDownload } from '../src'
import { createBlobUrl, getLinkUrl } from '../src/hooks/useDownload'

describe('useDownload', () => {
  let download
  beforeAll(() => {
    download = renderHook(() => useDownload())
  })
  it('should be defined', () => {
    expect(download).toBeDefined()
  })
  it('should return a download instance function', () => {
    const instance = download.result.current
    expect(instance).toBeInstanceOf(Function)
  })
  it('should create a new download instance', () => {
    const createInstance = download.result.current
    const instance = createInstance({ name: '1', data: '1' })
    expect(instance).toHaveProperty('download')
    expect(instance.download).toBeInstanceOf(Function)
  })
  it('should throw error if not have data', () => {
    const createInstance = download.result.current
    expect(() => createInstance({ name: '1' })).toThrowError(
      new Error('[createDownloadInstance]: invalid data!'),
    )
  })

  it('should create url when type is text', () => {
    expect(createBlobUrl('1', 'text')).toEqual((global as any).__MOCK_URL__)
  })
  it('should create url when type is json', () => {
    expect(createBlobUrl('1', 'json')).toEqual((global as any).__MOCK_URL__)
  })
  it('should create url when type is url', () => {
    expect(getLinkUrl('url')).not.toEqual(null)
  })
})
