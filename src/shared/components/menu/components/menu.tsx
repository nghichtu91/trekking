import React from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd/es/menu'
export interface IMenuItem {
  key: string
  title?: string | React.ReactNode
  uri?: string
  icon?: string | React.ReactNode
  i18nKey?: string
  className?: string
}

interface BaseMenuProps extends MenuProps {
  items: IMenuItem[]
  onMenuclick?: (url?: string, paramr?: unknown) => void
}

export const BaseMenu: React.FC<BaseMenuProps> = props => {
  const menuItemsRender = () => {
    return props.items.map(item => (
      <Menu.Item
        onClick={() => (props.onMenuclick ? props.onMenuclick(item.uri) : null)}
        className="my-0 px-3 hover:bg-gray-100"
        icon={item.icon}
        key={item.key}
      >
        {item.title}
      </Menu.Item>
    ))
  }
  return <Menu {...props}>{menuItemsRender()}</Menu>
}
