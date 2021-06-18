import React, { useState } from 'react'
import { Popover, Typography, Avatar, Row, Col, Button } from 'antd'
import { UserOutlined, LogoutOutlined, SafetyCertificateFilled } from '@ant-design/icons'
import { BaseMenu } from '@shared/components/menu'
import Helper from '@shared/utils/helper'
import { IProfileMenus } from '@shared/constants/menus'

export interface ProfileProps {
  userId?: string
  fullName?: string
  avatar?: string
  verifed?: boolean
  username?: string
}

interface ProfilePopoverProps {
  onSignOut?: () => void
  profile?: ProfileProps
  profileMenu?: IProfileMenus[]
  onMenuClick?: (key: string) => void
}

export const ProfilePopover: React.FC<ProfilePopoverProps> = props => {
  const [enable, setEnable] = useState<boolean>(false)
  const { onSignOut = () => false, profile, profileMenu = [] } = props
  const align = {
    offset: [20, 10],
  }

  const handlePPVisibleChange = visible => {
    setEnable(visible)
  }

  const handleSignOut = () => {
    setEnable(false)
    onSignOut()
  }

  const handleMenu = () => {
    setEnable(false)
  }

  const profileMenus = () => {
    return (
      <Row justify="space-between" gutter={[0, 0]}>
        <Col className="p-3 border-b border-gray-200" span={24}>
          <Row>
            <Col span={6}>
              <Avatar src={profile?.avatar} size={55} icon={<UserOutlined />} />
            </Col>
            <Col span={18}>
              <Typography.Title className="text-blue-500 mb-1" level={5}>
                {profile?.fullName}
                {profile?.verifed ? (
                  <SafetyCertificateFilled className="align-baseline text-base text-yellow-500" />
                ) : null}
              </Typography.Title>
              <Typography.Text type="secondary">@{profile?.username}</Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col slot="popover-profile--menu" className="popover-profile--menu" span={24}>
          <BaseMenu onMenuclick={handleMenu} className="border-0" items={profileMenu} />
        </Col>
        <Col className="p-3 border-t border-gray-200 hover:bg-gray-100" span={24}>
          <Button
            className="btn--sign-out"
            onClick={handleSignOut}
            type="text"
            icon={<LogoutOutlined className="align-baseline" />}
          >
            Thoát
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <Popover
      visible={enable}
      onVisibleChange={handlePPVisibleChange}
      overlayClassName={`tt-popover popover--profile`}
      trigger="click"
      arrowPointAtCenter={true}
      content={profileMenus}
      destroyTooltipOnHide
      placement="bottomRight"
      align={align}
      getPopupContainer={() => Helper.getContainer()}
    >
      <Typography.Link className="block" type="secondary">
        <Avatar src={profile?.avatar} icon={<UserOutlined />} />
      </Typography.Link>
    </Popover>
  )
}
