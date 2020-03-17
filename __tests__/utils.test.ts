import { uuid } from '../src/utils/uuid'
import { trim } from '../src/utils/string'
import { isFunction } from '../src/utils/function'

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

  describe('# isFunction', () => {
    it('should return a boolean', () => {
      const a = () => {}
      const b = a
      expect(isFunction('')).toEqual(false)
      expect(isFunction({})).toEqual(false)
      expect(isFunction('test')).toEqual(false)
      expect(isFunction([])).toEqual(false)
      expect(isFunction(function test() {})).toEqual(true)
      expect(isFunction(() => {})).toEqual(true)
      expect(isFunction(b)).toEqual(true)
    })
  })

  describe('# uuid', () => {
    it('should generate uniq id', async () => {
      expect(typeof uuid()).toEqual('string')
      // eslint-disable-next-line no-self-compare
      expect(uuid() !== uuid()).toEqual(true)
    })
  })
})
