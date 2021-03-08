import React from 'react'
import { IProduct } from '@modules/product/models/product'
import { List, Typography, Avatar, Button, Badge } from 'antd'
import { ProductMeta } from './ProductMeta'
// import { AccountInfo } from './AccountInfo'
import { ProductRequire } from './Require'

interface ProductItemProps {
  item: IProduct
}

export const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const isTradeBuy = (): boolean => {
    return item.tradeType === 2
  }

  return (
    <Badge.Ribbon color={isTradeBuy() ? 'orange' : 'green'} text={isTradeBuy() ? 'Bán' : 'Mua'}>
      <List.Item
        className="product-item"
        extra={
          <>
            <Typography>
              <Typography.Title level={3}>Giá: 5000G</Typography.Title>
            </Typography>
            <Button>Giao Dịch </Button>
          </>
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar
              size={64}
              shape="circle"
              src="https://cdn.rok.guide/wp-content/uploads/2019/02/charles-martel-264x300.png"
            />
          }
          title={<Typography.Text strong>{`#${item.id} ${item.title}`}</Typography.Text>}
          description=""
        />
        {
          <>
            {/* <Typography>
              <Space>
                <Typography.Text type="danger">Nhà: 25</Typography.Text>
                <Typography.Text type="warning">Sức mạnh: 50m</Typography.Text>
                <Typography.Text type="success">Nền văn minh: La Mã</Typography.Text>
                <Typography.Text type="danger">Kênh: 1111</Typography.Text>
              </Space>
            </Typography> */}
            {/* <AccountInfo /> */}
            {isTradeBuy() ? <ProductMeta /> : null}
            {!isTradeBuy() ? <ProductRequire /> : null}
          </>
        }
      </List.Item>
    </Badge.Ribbon>
  )
}
