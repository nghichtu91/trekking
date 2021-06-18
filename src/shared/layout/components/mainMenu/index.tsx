import React from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd/es/menu'
import { MainMenus } from '@shared/constants/menus'
import { Trans } from 'next-i18next'
import styles from './styles/mainmenu.module.scss'

export const MainMenu: React.FC<MenuProps> = props => {
  return (
    <Menu id={styles['menu--main']} mode="horizontal" {...props}>
      {MainMenus.map(item => (
        <Menu.Item className={styles['menu--main--iten']} key={item.key}>
          <Trans i18nKey={item.i18nKey}> {item.title} </Trans>
        </Menu.Item>
      ))}
    </Menu>
  )
}
