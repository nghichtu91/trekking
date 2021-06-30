import React from 'react'
import { Typography, Space } from 'antd'
import { Attribute } from '@modules/product/models/product'

interface CarDescriptionProps {
  attributes?: Attribute[]
}

export const Attributes: React.FC<CarDescriptionProps> = ({ attributes = [] }) => {
  return (
    <Space>
      {attributes.map(attr => (
        <Typography.Text key={attr.key} className="block" type="secondary">
          {attr.val}
        </Typography.Text>
      ))}
    </Space>
  )
}
