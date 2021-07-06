import React from 'react'
import { Typography } from 'antd'
import { Attribute } from '@modules/product/models/product'
import styles from './styles/condition.module.scss'

interface CarDescriptionProps {
  attributes?: Attribute[]
}

export const Condition: React.FC<CarDescriptionProps> = ({ attributes = [] }) => {
  const fdf: string[] = attributes.map(attr => attr.val) as string[]
  return (
    <div className={styles['condition-wrapper']}>
      <Typography.Text className={styles['condition']} type="secondary">
        {fdf.join(' - ')}
      </Typography.Text>
    </div>
  )
}
