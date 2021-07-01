import React from 'react'
import { Avatar } from 'antd'

interface ThumbProps {
  src?: string
}

export const Thumb: React.FC<ThumbProps> = ({ src }) => {
  return <Avatar className="thumbnail" size={84} shape="square" src={src} />
}
