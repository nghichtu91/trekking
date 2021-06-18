import React from 'react'
import { Space, Button } from 'antd'
import { CreatePostButton } from './components/createPostButton'
import { Notification } from './components/notification'
import { ProfilePopover, ProfileProps } from './components/profilePopover'
import { IProfileMenus } from '@shared/constants/menus'
import { UserOutlined } from '@ant-design/icons'

interface RightMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isAuthenticated?: boolean
  onSignIn?: () => void
  profile?: ProfileProps
  onSignOut?: () => void
  profileMenu?: IProfileMenus[]
}

export const RightMenu: React.FC<RightMenuProps> = props => {
  const { isAuthenticated = false, profile, profileMenu } = props
  const { onSignIn = () => false, onSignOut = () => false } = props

  const btnSignInRender = () => {
    if (isAuthenticated) return null
    return (
      <Button onClick={onSignIn} icon={<UserOutlined className="align-baseline" />}>
        Đăng nhập
      </Button>
    )
  }

  const authenticatedRender = () => {
    if (!isAuthenticated) return null
    return (
      <>
        <Notification />
        <CreatePostButton />
        <ProfilePopover profileMenu={profileMenu} onSignOut={onSignOut} profile={profile} />
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
