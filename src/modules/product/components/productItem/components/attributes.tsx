import React from 'react'
import { Typography, Space } from 'antd'
import { Attribute } from '@modules/product/models/product'

interface CarDescriptionProps {
  attributes?: Attribute[]
}

export const Attributes: React.FC<CarDescriptionProps> = () => {
  return (
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
  )
}
