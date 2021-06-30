import React from 'react'
import { IProduct } from '@modules/product/models/product'
import { List, Typography, Space } from 'antd'
import styles from './styles/product.module.scss'
// mport { HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import moment from 'moment'
//#region components
import { Author } from './author'
import { Company } from './company'
import { Thumb } from './thumb'
import { Title } from './title'
import { Attributes } from './attributes'
import { Price } from './price'
//#endregion

// #region model
import { Attribute } from '../../../models/product'
// #endregion

export interface Author {
  authorId: string
  authorName: string
}

interface WrapperItemProps {
  item: IProduct
  productId: string
  title?: string
  author?: string
  authorId?: string
  companyId?: string | number
  shortAttrs?: Attribute[]
  attributes?: Attribute[]
  shop?: unknown
  price?: number
}

export const WrapperItem: React.FC<WrapperItemProps> = props => {
  const { productId, item, companyId, shortAttrs, shop, price } = props

  const Meta = List.Item.Meta
  const authorName = shop ? shop : item?.author

  return (
    <div className={`${styles['product']}`} role="button">
      <List.Item
        className={`${styles['item']}`}
        extra={
          <Space size="small" direction="vertical">
            <Company companyId={companyId} />
            {/* <Button type="text" icon={<HeartOutlined />} /> */}
          </Space>
        }
      >
        <Link href={`/mua-ban/view/${productId}`}>
          <Meta
            avatar={<Thumb src={item.thumb} />}
            title={<Title title={item.title} no={item.id} />}
            description={
              <>
                <Attributes attributes={shortAttrs} />
                <Price value={price} />
                <Space>
                  <Author isShop={!!shop} name={authorName} />
                  <Typography.Text type="secondary">
                    {moment(item?.created_at).fromNow()}
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
