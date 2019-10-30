import React from 'react'
import { useTrimInput } from '../../src'
import { Form, Input } from 'antd'

export default {
  title: 'useTrimInput',
  parameters: { notes: require('./index.md') },
}

export const Example = () => {
  const [trimValue, setTrimValue] = useTrimInput()
  const [fullTrimValue, setFullTrimValue] = useTrimInput(true)
  return (
    <Form style={{ width: 500 }}>
      <Form.Item label="前后不能有空格">
        <Input
          value={trimValue}
          onChange={setTrimValue}
          placeholder="请输入姓名"
        />
      </Form.Item>
      <Form.Item label="所有不能有空格">
        <Input
          value={fullTrimValue}
          onChange={setFullTrimValue}
          placeholder="请输入姓名"
        />
      </Form.Item>
    </Form>
  )
}
