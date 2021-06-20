import React from 'react'
import { Avatar } from 'antd'

interface ThumbProps {
  src?: string
}

export const Thumb: React.FC<ThumbProps> = ({ src }) => {
  return (
    <Avatar
      size={84}
      shape="square"
      src={src || 'https://static.carmudi.vn/wp-content/uploads/2019-11/FUWAnaL1dl.jpg'}
    />
  )
}
