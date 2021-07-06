import React from 'react'
import { Typography } from 'antd'
import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import globalStyles from './styles/global.module.scss'

interface AuthorProps {
  name?: string | unknown
  id?: string
  isShop?: boolean
}

export const Author: React.FC<AuthorProps> = ({ name, isShop = false }) => {
  const AuthorIcon = isShop ? (
    <ShopOutlined className="align-baseline" />
  ) : (
    <UserOutlined className="align-baseline" />
  )
  const type = isShop ? 'warning' : 'secondary'

  return (
    <Typography.Text className={` ${globalStyles['text-overflow']} w-14`} type={type}>
      {AuthorIcon} {name}
    </Typography.Text>
  )
}
