import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Table } from 'antd'
import { Router, useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { useSearchParams } from '../../src'
import { UseSearchParamsSchemaType } from '../../src/hooks/useSearchParams'

export default {
  title: 'useSearchParams',
  parameters: {
    notes: require('./index.md'),
  },
}

const history = createMemoryHistory()

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

interface Schema {
  name: string
  age: number
  like: boolean
  success: boolean
  page: number
  friends: string[]
}

export const Example = () => (
  <Router history={history}>
    <Base />
  </Router>
)

export const TableExample = () => (
  <Router history={history}>
    <TablePage />
  </Router>
)

const TablePage = () => {
  const schema = {
    page: {
      type: UseSearchParamsSchemaType.NUMBER,
      default: 1,
    },
  }
  const { searchParams, set, remove } = useSearchParams<Schema>({
    schema,
  })
  return (
    <>
      <h2>与 Antd Table 结合</h2>
      <hr />
      <pre>{JSON.stringify(searchParams, undefined, 2)}</pre>
      <Button type="primary" onClick={() => remove(['page'])}>
        移除page属性
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: searchParams.page,
          pageSize: 1,
          onChange(page) {
            set({ page })
          },
        }}
      />
    </>
  )
}

const Base = () => {
  const schema = {
    name: UseSearchParamsSchemaType.STRING,
    like: UseSearchParamsSchemaType.BOOLEAN,
    success: UseSearchParamsSchemaType.BOOLEAN,
    age: {
      type: UseSearchParamsSchemaType.NUMBER,
      default: 10,
    },
    test: {
      type: UseSearchParamsSchemaType.STRING,
      default: 'defaultValue',
    },
    friends: UseSearchParamsSchemaType.ARRAY,
  }
  const { searchParams, set, remove, reset } = useSearchParams<Schema>({
    schema,
  })

  const { search } = useLocation()

  return (
    <div>
      <h2>基础示例:</h2>
      <Button
        type="primary"
        onClick={() => {
          set({
            name: 'test',
            like: false,
            success: true,
            age: 18,
            friends: ['a', 'b'],
          })
        }}
      >
        添加参数
      </Button>

      <h3>原始 location search: </h3>
      <hr />
      <pre>{JSON.stringify(search, undefined, 2)}</pre>

      <h3>通过 schema 解析之后的 searchParams:</h3>
      <hr />
      <pre>{JSON.stringify(searchParams, undefined, 2)}</pre>

      <h2>移除某个属性</h2>
      <Button
        type="danger"
        onClick={() => {
          remove(['name'])
        }}
      >
        移除 name 属性
      </Button>
      <Button
        type="danger"
        style={{ margin: '0 10px' }}
        onClick={() => {
          remove()
        }}
      >
        移除所有属性
      </Button>
      <Button
        type="danger"
        onClick={() => {
          reset()
        }}
      >
        重置
      </Button>
    </div>
  )
}
