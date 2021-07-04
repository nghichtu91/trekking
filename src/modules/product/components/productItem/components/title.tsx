import React from 'react'
import { Typography } from 'antd'
import { TextProps } from 'antd/es/typography/Text'
import styles from './styles/title.module.scss'

type Layout = 'grid' | 'detail'

interface TitleProps extends TextProps {
  title?: string
  no?: string
  layout?: Layout
}

export const Title: React.FC<TitleProps> = props => {
  const { title, layout = 'grid' } = props
  return <Typography.Text className={`${styles[layout]}`}>{title}</Typography.Text>
}
