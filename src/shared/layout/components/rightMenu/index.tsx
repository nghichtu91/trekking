import React, { useState } from 'react'
import { Space, Popover, Typography, Button, Avatar } from 'antd'
import Helper from '@shared/utils/helper'
import { CreatePostButton } from './components/createPostButton'
import { Notification } from './components/notification'

import { UserOutlined } from '@ant-design/icons'

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
