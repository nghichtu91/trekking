import React, { useState } from 'react'
import { Menu, Space, Popover, List, Typography, Badge, Button, Avatar, Tooltip } from 'antd'
import { MenuProps } from 'antd/es/menu'
import { MainMenus } from '@shared/constants/menus'
import { Trans } from 'next-i18next'
import styles from './styles/mainmenu.module.scss'
import { Routers } from '@shared/constants/routers'

import Helper from '@shared/utils/helper'
import {
  MenuOutlined,
  LogoutOutlined,
  SafetyCertificateFilled,
  UserOutlined,
  BellOutlined,
  EditOutlined,
} from '@ant-design/icons'

interface RightMenuProps {
  isAuthenticated?: boolean
}

export const RightMenu: React.FC<RightMenuProps> = ({ isAuthenticated = false }) => {
  const [PopoverProfile, setIsPopoverProfile] = useState<boolean>(false)

  const popoverProfileShow = () => setIsPopoverProfile(true)

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]
  return (
    <Space size={16}>
      {isAuthenticated ? (
        <>
          <Popover
            trigger="click"
            overlayClassName="tt-popover popover--profile"
            placement="bottomRight"
            arrowPointAtCenter={true}
            getPopupContainer={() => Helper.getContainer()}
            align={{
              offset: [20, 10],
            }}
            content={
              <List
                bordered
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            }
          >
            <Badge overflowCount={9} count={9}>
              <BellOutlined className="text-lg" />
            </Badge>
          </Popover>
          <Tooltip
            placement="bottomRight"
            align={{
              offset: [20, 10],
            }}
            title="Đăng bài"
            arrowPointAtCenter={true}
          >
            <Typography.Link type="secondary">
              <EditOutlined className="text-lg" />
            </Typography.Link>
          </Tooltip>
          <Popover
            visible={PopoverProfile}
            // onVisibleChange={handlePPVisibleChange}
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
              {/* <Avatar src={profile.avatar} icon={<UserOutlined id="fdfdf" />} /> */}
            </Typography.Link>
          </Popover>
        </>
      ) : (
        <Button icon={<UserOutlined className="align-baseline" />} href={Routers.SignInPage}>
          {/* <Typography.Text>
              <UserOutlined style={{ fontSize: 19 }} /> Đăng nhập
            </Typography.Text> */}
          Đăng nhập
        </Button>
      )}
    </Space>
  )
}
