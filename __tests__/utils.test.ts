import { trim } from '../src/utils/string'

describe('utils tests', () => {
  describe('# trim', () => {
    it('should trim value', () => {
      expect(trim('')).toEqual('')
      expect(trim('test ')).toEqual('test')
      expect(trim('  test ')).toEqual('test')
      expect(trim('te st ')).toEqual('te st')
    })
    it('should full trim value', () => {
      expect(trim('', true)).toEqual('')
      expect(trim('te st ', true)).toEqual('test')
      expect(trim('  te  st ', true)).toEqual('test')
      expect(trim('te st ', true)).toEqual('test')
    })
  })
})
