import React from 'react'
import { List, Card, ListProps } from 'antd'
import { WrapperItem, WrapperItemVertical } from '../productItem'
import { PaginationConfig } from 'antd/es/pagination'
import { IProduct } from '@modules/product/models/product'
type Layout = 'horizontal' | 'vertical' | 'grid'

export interface ProductListProps extends ListProps<IProduct> {
  dataSource?: IProduct[]
  total?: number
  onChangePagination?: (page: number, pageSize?: number) => void
  paged?: number
  layout?: Layout
  loadBtn?: React.ReactNode
  isPagination?: boolean
  // loadMore?: React.ReactNode
}

export const ProductList: React.FC<ProductListProps> = props => {
  const {
    pagination,
    dataSource = [],
    layout = 'grid',
    loadMore = null,
    grid = { gutter: 8, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 },
  } = props

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

  if (layout === 'grid') {
    return (
      <List
        grid={grid}
        dataSource={dataSource}
        loadMore={loadMore}
        rowKey="id"
        itemLayout="vertical"
        pagination={pagination}
        renderItem={item => (
          <List.Item>
            <Card bordered bodyStyle={{ padding: 0 }}>
              <WrapperItemVertical
                shortAttrs={item.shortAttrs}
                item={item}
                price={item.price}
                productId={item['id']}
                key={item['id']}
              />
            </Card>
          </List.Item>
        )}
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
