import React from 'react'
import { IProduct } from '@modules/product/models/product'
import { List, Typography, Button, Space } from 'antd'
import styles from './styles/product.module.scss'
import { HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Author } from './author'
import { Company } from './company'
import { Thumb } from './thumb'
import { Title } from './title'
import { Attributes } from './attributes'

interface ProductItemProps {
  item: IProduct
  productId: string
  title?: string
  author?: string
  authorId?: string
  companyId?: string
}

export const WrapperItem: React.FC<ProductItemProps> = ({ item, companyId }) => {
  const Meta = List.Item.Meta
  return (
    <div className={`${styles['product']}`} role="button">
      <List.Item
        className={`${styles['item']}`}
        extra={
          <Space size="small" direction="vertical">
            <Company companyId={companyId} />
            <Button type="text" icon={<HeartOutlined />} />
          </Space>
        }
      >
        <Link href="/">
          <Meta
            avatar={<Thumb src={item.thumb} />}
            title={<Title title={item.title} no={item.id} />}
            description={
              <>
                <Attributes />
                <Typography.Text className="block" strong type="danger">
                  250.000.000 đ
                </Typography.Text>
                <Space>
                  <Author name={item?.author} />
                  <Typography.Text type="secondary">
                    {item?.created_at?.toLocaleString() || ''}
                  </Typography.Text>
                </Space>
              </>
            }
          />
        </Link>
      </List.Item>
    </div>
  )
}
