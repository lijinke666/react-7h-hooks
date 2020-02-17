# useSearchParams

对 `URLSearchParams` 的一系列封装, 来处理 URL 的查询字符串, 通过定义 `schema`
解决 URL 字符串 和 Search params 之间的格式互转, 同时内部会调用 `history.push` 进行 浏览记录的同步

## 使用场景

- 当列表分页时，需要将当前页码和页数同步到地址栏的 URL 上时
- 将当前查询条件同步到URL上，以便刷新页面保存搜索结果

## 如何使用

```jsx
import React from 'react'
import { Table, Button } from 'antd'
import { useSearchParams } from 'react-7h-hooks'

export const Example = () => {
  const schema = {
    page: {
      type: UseSearchParamsSchemaType.NUMBER,
      default: 1,
    },
  }
  const { searchParams, set, remove } = useSearchParams({
    schema
  })
  return (
    <>
      <Button type="primary" onClick={() => remove(['page'])}>
        移除page属性
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: searchParams.page,
          onChange(page, pageSize) {
            set({ page })
          },
        }}
      />
    </>
  )
}


```

## API

```tsx
const { searchParams, set, remove, reset } = useSearchParams(options)

```

| 属性             | 说明                               | 类型                              | 默认值              |
| ---------------- | ---------------------------------- | --------------------------------- | ------------------- |
| options.schema   | 字段的映射关系                     | `UseSearchParamsSchema`           | `-`                 |
| options.pathname | push的路径名, 默认当前路径名       | `string`                          | `location.pathname` |
| searchParams     | 按照schema规则转换之后的查询参数   | `{ [key: string]: any }`          | `-`                 |
| set              | 设置参数，如果已存在,则会覆盖      | `(values: Partial<T>) => void`    | `-`                 |
| remove           | 移除参数，如果不传参数, 则移除所有 | `(keys?: Array<keyof T>) => void` | `-`                 |
| reset            | 重置所有参数                       | `() => void`                      | `-`                 |

```tsx
export interface UseSearchParamsSchema {
  [key: string]: UseSearchParamsSchemaDetail | string
}

export interface UseSearchParamsSchemaDetail {
  type: string
  default: string | Array<any> | number | boolean
}
```
