import { renderHook } from '@testing-library/react-hooks'
import { useDownload } from '../src'

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
})
