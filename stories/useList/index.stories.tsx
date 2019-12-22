/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from '../../src'

export default {
  title: 'useList',
  parameters: { notes: require('./index.md') },
}

export const Example = () => {
  const { list, onAdd, onRemove, onReset, onClear, onGetTitle } = useList({
    title: '表单',
    count: 2,
  })
  return (
    <>
      {list.map(id => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)}>
              <Icon type="plus" /> 删除
            </Button>
          </Form.Item>
        )
      })}
      <Button type="dashed" onClick={onAdd}>
        <Icon type="plus" /> 新增
      </Button>
      {list.length >= 1 && (
        <>
          <Button type="danger" onClick={onReset}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </>
  )
}
