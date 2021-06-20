import React from 'react'
import { Statistic } from 'antd'
import { StatisticProps } from 'antd/es/statistic'

export const Price: React.FC<StatisticProps> = props => {
  return (
    <Statistic {...props} className="price" groupSeparator="." decimalSeparator="," suffix="₫" />
  )
}
