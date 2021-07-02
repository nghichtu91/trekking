import { List } from 'antd'
import { WrapperItem } from '../productItem'
import { PaginationConfig } from 'antd/es/pagination'

export interface ProductListProps {
  dataSource?: unknown
  total?: 0
  onChangePagination?: (page: number, pageSize?: number) => void
  paged?: number
}

export const ProductList = ({ dataSource = [], total = 10, paged = 1, onChangePagination }) => {
  // const itemRender = (current, type, originalElement) => {
  //   if (type === 'prev') {
  //     return <a>Previous</a>
  //   }
  //   if (type === 'next') {
  //     return <a>Next</a>
  //   }
  //   return originalElement
  // }

  const pagination: PaginationConfig = {
    total,
    defaultPageSize: 5,
    defaultCurrent: 1,
    onChange: onChangePagination,
    responsive: true,
    current: paged,
    // itemRender: itemRender,
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={dataSource}
      pagination={pagination}
      renderItem={item => (
        <WrapperItem
          shop={item.shop}
          shortAttrs={item.shortAttrs}
          productId={item.id}
          price={item.price}
          item={item}
          companyId={item.companyId}
        />
      )}
    />
  )
}
