import React from 'react'
import { IProduct } from '@modules/product/models/product'
import styles from './styles/product.module.scss'
import Link from 'next/link'
import { Space } from 'antd'
//#region components
import { Author } from './author'
import { Title } from './title'
import { Price } from './price'
import { ProductCreated } from './created'
import { Condition } from './condition'
//#endregion

// #region model
import { Attribute } from '../../../models/product'
// #endregion

// export interface Author {
//   authorId: string
//   authorName: string
// }

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

export const WrapperItemVertical: React.FC<WrapperItemProps> = props => {
  const { productId, item, shortAttrs, shop, price } = props
  const authorName = shop ? shop : item?.author

  return (
    <div className={`${styles['product-vertical']}  ${styles['border--right']} ${styles['item']} `}>
      <div className={`${styles['wrapper']}`}>
        <Link href={`/mua-ban-xe/${productId}.html`}>
          <a>
            <div className={`${styles['thumbnailWrapper']}`}>
              <div className={`${styles['thumbnailImg']}`}>
                <img src={item.thumb} alt="dsd" />
              </div>
            </div>
            <div className={`${styles['caption']}`}>
              <Title title={item.title} no={item.id} />
              <Condition attributes={shortAttrs} />
              <Price value={price} />
            </div>
            <div className={`${styles['footer']}`}>
              <Author name={authorName} />
              <ProductCreated created_at={item.created_at} />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
