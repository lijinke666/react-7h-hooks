/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useNextTick } from '../../src'

export default {
  title: 'useNextTick',
  parameters: { notes: require('./index.md') },
}

export const Example = () => {
  const reTrigger = useNextTick(() => {
    message.info('自动触发')
  })
  const nextTick = useNextTick()
  const onClick = useCallback(() => {
    nextTick(() => {
      message.warn('手动触发')
    })
  }, [nextTick])

  return (
    <>
      <Button onClick={onClick}>手动触发</Button>
      <Button onClick={() => reTrigger()}>再次自动触发</Button>
    </>
  )
}
