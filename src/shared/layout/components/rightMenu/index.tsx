import React, { HtmlHTMLAttributes, useState } from 'react'
import { Menu, Space, Popover, List, Typography, Badge, Button, Avatar, Tooltip } from 'antd'
import { MenuProps } from 'antd/es/menu'
import { MainMenus } from '@shared/constants/menus'
import { Trans } from 'next-i18next'
import styles from './styles/mainmenu.module.scss'
import { Routers } from '@shared/constants/routers'
import Helper from '@shared/utils/helper'
import { CreatePostButton } from './components/createPostButton'
import { Notification } from './components/notification'

import {
  MenuOutlined,
  LogoutOutlined,
  SafetyCertificateFilled,
  UserOutlined,
  BellOutlined,
  EditOutlined,
} from '@ant-design/icons'

interface profileProps {
  userId?: string
  fullName?: string
  avatar?: string
}

interface RightMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isAuthenticated?: boolean
  onSignIn?: () => void
  profile?: profileProps
}

export const RightMenu: React.FC<RightMenuProps> = props => {
  const [PopoverProfile, setIsPopoverProfile] = useState<boolean>(false)
  const { isAuthenticated = false, profile } = props
  const { onSignIn = () => false } = props
  const popoverProfileShow = () => setIsPopoverProfile(true)

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]

  const btnSignInRender = () => {
    if (isAuthenticated) return null
    return (
      <Button onClick={onSignIn} icon={<UserOutlined className="align-baseline" />}>
        Đăng nhập
      </Button>
    )
  }

  const handlePPVisibleChange = visible => {
    setIsPopoverProfile(visible)
  }

  const authenticatedRender = () => {
    if (!isAuthenticated) return null
    return (
      <>
        <Notification />
        <CreatePostButton />
        <Popover
          visible={PopoverProfile}
          onVisibleChange={handlePPVisibleChange}
          overlayClassName={`popover--profile`}
          trigger="click"
          arrowPointAtCenter={true}
          // content={profileMenus()}
          destroyTooltipOnHide
          placement="topRight"
          align={{
            offset: [20, 11],
          }}
          getPopupContainer={() => Helper.getContainer()}
        >
          <Typography.Link className="block" onClick={popoverProfileShow} type="secondary">
            <Avatar src={profile.avatar} icon={<UserOutlined id="fdfdf" />} />
          </Typography.Link>
        </Popover>
      </>
    )
  }
  return (
    <Space size={16}>
      {authenticatedRender()}
      {btnSignInRender()}
    </Space>
  )
}
