import React from 'react'
import { Typography } from 'antd'
import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import Styles from './styles/author.module.scss'

interface AuthorProps {
  name?: string | unknown
  id?: string
  isShop?: boolean
}

export const Author: React.FC<AuthorProps> = ({ name, isShop = false }) => {
  return (
    <Typography.Text>
      {isShop ? (
        <ShopOutlined className="align-baseline" />
      ) : (
        <UserOutlined className="align-baseline" />
      )}{' '}
      <Typography.Text
        className={` product--author  ${Styles['item--mobile']}`}
        type={isShop ? 'warning' : 'secondary'}
      >
        {name}
      </Typography.Text>
    </Typography.Text>
  )
}
