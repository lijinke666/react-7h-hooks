import React, { useCallback } from 'react'
import { useDownload } from '../../src'
import { Button } from 'antd'

export default {
  title: 'useDownload',
  parameters: { notes: require('./index.md') },
}

export const Example = () => {
  const createDownloadInstance = useDownload()
  const onClick = useCallback(() => {
    const instance = createDownloadInstance({
      name: 'favicon',
      data: require('./favicon.ico'),
    })
    instance.download()
  }, [])
  return (
    <Button icon="download" type="primary" onClick={onClick}>
      下载图标
    </Button>
  )
}
