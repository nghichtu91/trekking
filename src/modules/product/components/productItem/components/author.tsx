import React from 'react'
import { Typography } from 'antd'
import { UserOutlined, ShopOutlined } from '@ant-design/icons'

interface AuthorProps {
  name?: string | unknown
  id?: string
  isShop?: boolean
}

export const Author: React.FC<AuthorProps> = ({ name, isShop = false }) => {
  return (
    <Typography.Text type={isShop ? 'warning' : 'secondary'}>
      {isShop ? (
        <ShopOutlined className="align-baseline" />
      ) : (
        <UserOutlined className="align-baseline" />
      )}{' '}
      {name}
    </Typography.Text>
  )
}
