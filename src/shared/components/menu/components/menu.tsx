import React from 'react'
import { Menu } from 'antd'

interface MenuItem {
  key: string | number
  name: string | React.ReactNode
  uri: string
}

interface BaseMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
  menuclick: () => void
}

export const BaseMenu: React.FC<BaseMenuProps> = props => {
  const abc = () => {}
  return <Menu onClick={abc}> Menu</Menu>
}
