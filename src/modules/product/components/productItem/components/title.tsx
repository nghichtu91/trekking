import React from 'react'
import { Typography } from 'antd'

interface TitleProps {
  title?: string
  no?: string
}

export const Title: React.FC<TitleProps> = ({ title, no }) => {
  return <Typography.Text className="product--title" strong>{`#${no} ${title}`}</Typography.Text>
}
