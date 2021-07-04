import React from 'react'
import { List } from 'antd'
import { WrapperItem } from '../productItem'
import { PaginationConfig } from 'antd/es/pagination'
import { IProduct } from '@modules/product/models/product'

type Layout = 'horizontal' | 'vertical'

export interface ProductListProps {
  dataSource?: IProduct[]
  total?: number
  onChangePagination?: (page: number, pageSize?: number) => void
  paged?: number
  layout?: Layout
  loadBtn?: React.ReactNode
  isPagination?: boolean
}

export const ProductList: React.FC<ProductListProps> = props => {
  const {
    dataSource = [],
    total = 10,
    paged = 1,
    onChangePagination,
    layout = 'horizontal',
    isPagination = false,
  } = props

  const pagination: PaginationConfig = {
    total,
    defaultPageSize: 5,
    defaultCurrent: 1,
    onChange: onChangePagination,
    responsive: true,
    current: paged,
  }

  const itemRender = (item: IProduct) => (
    <WrapperItem
      shop={item.shop}
      shortAttrs={item.shortAttrs}
      productId={item.id}
      price={item.price}
      item={item}
      companyId={item.companyId}
    />
  )

  if (layout === 'horizontal') {
    return (
      <List
        grid={{ column: 3, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
        className={`list-products list-products-${layout}`}
        dataSource={dataSource}
        pagination={isPagination ? pagination : false}
        rowKey="id"
        renderItem={itemRender}
      />
    )
  }

  return (
    <List
      className={`list-products list-products-${layout}`}
      dataSource={dataSource}
      pagination={pagination}
      rowKey="id"
      renderItem={itemRender}
    />
  )
}
