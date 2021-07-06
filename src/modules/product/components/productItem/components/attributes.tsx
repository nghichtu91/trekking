import React from 'react'
import { Typography } from 'antd'
import { Attribute } from '@modules/product/models/product'

interface CarDescriptionProps {
  attributes?: Attribute[]
}

export const Attributes: React.FC<CarDescriptionProps> = ({ attributes = [] }) => {
  const fdf: string[] = attributes.map(attr => attr.val) as string[]
  return (
    <Typography.Text className="block" type="secondary">
      {fdf.join(' - ')}
    </Typography.Text>
  )
}
