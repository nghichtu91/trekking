import React from 'react'
import { Typography } from 'antd'
import moment from 'moment'

interface ProductCreatedProps {
  created_at?: string | Date
}

export const ProductCreated: React.FC<ProductCreatedProps> = ({ created_at }) => {
  if (!created_at) return null
  return <Typography.Text type="secondary">{moment(created_at).fromNow()}</Typography.Text>
}
