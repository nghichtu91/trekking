import React from 'react'
import { IProduct } from '@modules/product/models/product'
import { List, Space } from 'antd'
import styles from './styles/product.module.scss'
// mport { HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
//#region components
import { Author } from './author'
import { Thumb } from './thumb'
import { Title } from './title'
import { Attributes } from './attributes'
import { Price } from './price'
import { ProductCreated } from './created'
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
  const { productId, item, shortAttrs, shop, price } = props

  const Meta = List.Item.Meta
  const authorName = shop ? shop : item?.author

  return (
    <div className={`${styles['product']}`} role="button">
      <List.Item className={`${styles['item']}`}>
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
                  <ProductCreated created_at={item?.created_at} />
                </Space>
              </>
            }
          />
        </Link>
      </List.Item>
    </div>
  )
}
