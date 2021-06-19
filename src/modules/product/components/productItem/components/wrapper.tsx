import React from 'react'
import { IProduct } from '@modules/product/models/product'
import { List, Typography, Avatar, Button, Space } from 'antd'
import styles from './styles/product.module.scss'
import { HeartOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'

interface ProductItemProps {
  item: IProduct
}

export const WrapperItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className={`${styles['product']}`} role="button">
      <List.Item
        className={`${styles['item']}`}
        extra={<Button type="text" icon={<HeartOutlined />} />}
      >
        <Link href="/">
          <List.Item.Meta
            avatar={
              <Avatar
                size={84}
                shape="square"
                src={
                  item.thumb ||
                  'https://static.carmudi.vn/wp-content/uploads/2019-11/FUWAnaL1dl.jpg'
                }
              />
            }
            title={<Typography.Text strong>{`#${item.id} ${item.title}`}</Typography.Text>}
            description={
              <Typography>
                <Space>
                  <Typography.Text className="block" type="secondary">
                    2016
                  </Typography.Text>
                  <Typography.Text className="block" type="secondary">
                    Tự động
                  </Typography.Text>
                  <Typography.Text className="block" type="secondary">
                    500km
                  </Typography.Text>
                </Space>

                <Typography.Text className="block" strong type="danger">
                  250.000.000 đ
                </Typography.Text>
                <Space>
                  <Typography.Text type="secondary">
                    <UserOutlined className="align-baseline" /> {item.author}
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    {item?.created_at?.toLocaleString() || ''}
                  </Typography.Text>
                </Space>
              </Typography>
            }
          />
        </Link>
      </List.Item>
    </div>
  )
}
