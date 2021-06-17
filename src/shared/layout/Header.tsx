import React, { useState, useRef } from 'react'
import { Auth } from 'aws-amplify'
import Helper from '@shared/utils/helper'
//#region nextjs components
import Image from 'next/image'
// #endregion
//#region antd
import {
  Layout,
  Row,
  Avatar,
  Col,
  Typography,
  Space,
  Popover,
  Badge,
  Tooltip,
  Drawer,
  Button,
  List,
} from 'antd'
import {
  MenuOutlined,
  LogoutOutlined,
  SafetyCertificateFilled,
  UserOutlined,
  BellOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { LayoutProps } from 'antd/es/layout'
//#endregion

import { MainMenu, RightMenu } from './components'

//#region constants
import { LOGO_SITE, ProfileMenus } from '@shared/constants'
//#endregion

//#region componets
import { BaseMenu } from '@shared/components/menu'
import { UseAws } from '@modules/profile/hooks/useAuthe'
import { useProfile } from '@modules/profile/hooks/userProfile'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'

//#endregion
interface HeaderProps extends LayoutProps {
  isAuthenticated?: boolean
  logoDom?: string | React.ReactNode
}

export const Header: React.FC<HeaderProps> = props => {
  const { profile } = useProfile()
  const [isAuthenticated] = UseAws()
  const router = useRouter()
  const [PopoverProfile, setIsPopoverProfile] = useState<boolean>(false)
  const [menuActivedKeys, setMenuActivedKeys] = useState<string[]>(['main--menu-home'])
  const headerRef = useRef<HTMLDivElement>(null)

  const handleSignIn = () => {
    return router.push(Routers.SignInPage)
  }
  // const onScroll = (event: Event) => {
  //   console.log('window scrolled!', event)
  //   console.log('2', headerRef.current.offsetTop)
  //   console.log('1', window.pageYOffset)
  //   if (window.pageYOffset >= headerRef.current.offsetTop) {
  //     headerRef.current.classList.add('sticky')
  //   } else {
  //     headerRef.current.classList.remove('sticky')
  //   }
  // }

  // useEventListener('scroll', onScroll)

  const logoSite = () => {
    const logo = !props.logoDom ? LOGO_SITE : props.logoDom
    if (typeof logo === 'string') {
      return (
        <Typography.Title className="h-full">
          <a href="/" className="align-middle inline-block" style={{ height: 32 }}>
            <Image src={logo} width={32} height={32} />
          </a>
        </Typography.Title>
      )
    }
    return props.logoDom
  }

  const profileMenuHandle = (url?: string) => {
    if (!url || url !== '#') {
      router.push({
        pathname: url,
        query: {
          id: profile.userId,
        },
      })
    }
    setIsPopoverProfile(false)
    return false
  }

  const handlePPVisibleChange = visible => {
    setIsPopoverProfile(visible)
  }

  const popoverProfileShow = () => setIsPopoverProfile(true)

  const signOutHandle = () => {
    Auth.signOut()
    setIsPopoverProfile(false)
  }

  const profileMenus = () => {
    return (
      <Row className="" justify="space-between" gutter={[0, 0]}>
        <Col className="p-3 border-b border-gray-200" span={24}>
          <Row>
            <Col span={6}>
              <Avatar size={55} src={profile.avatar} icon={<UserOutlined />} />
            </Col>
            <Col span={18}>
              <Typography.Title className="text-blue-500 mb-1" level={5}>
                {profile.fullName}
                {profile.identified ? (
                  <SafetyCertificateFilled className="align-baseline text-base text-yellow-500" />
                ) : null}
              </Typography.Title>
              <Typography.Text type="secondary">@{profile.username}</Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col slot="popover-profile--menu" className="popover-profile--menu" span={24}>
          <BaseMenu onMenuclick={profileMenuHandle} className="border-0" items={ProfileMenus} />
        </Col>
        <Col className="p-3 border-t border-gray-200 hover:bg-gray-100" span={24}>
          <Typography.Link onClick={signOutHandle}>
            <LogoutOutlined className="align-text-middle" /> Thoát
          </Typography.Link>
        </Col>
      </Row>
    )
  }

  const AuthenticatedRender = () => {
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
              onVisibleChange={handlePPVisibleChange}
              overlayClassName={`popover--profile`}
              trigger="click"
              arrowPointAtCenter={true}
              content={profileMenus()}
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

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleMenuOnDrawer = e => {
    console.log(e)
    setVisible(false)
  }

  const handleMenuOnDesktop = e => {
    console.log(e)
  }

  return (
    <div ref={headerRef} className="w-full top-0 sticky" id="header">
      <Layout.Header style={{ background: '#fff' }}>
        <Row gutter={[0, 0]} justify="center">
          <Col xs={24} sm={24} xxl={15} xl={15} lg={18} md={18}>
            <Row justify="space-between">
              <Col className="text-left" xs={8} sm={8} xxl={0} xl={0} lg={0} md={0}>
                <Button icon={<MenuOutlined />} onClick={showDrawer} />
              </Col>
              <Col className="text-center" xs={8} sm={8} xxl={18} xl={18} lg={15} md={15}>
                <Row>
                  <Col xs={24} sm={24} xxl={12} xl={12} lg={12} md={12}>
                    {logoSite()}
                  </Col>
                  <Col xs={0} sm={0} xxl={12} xl={12} lg={12} md={12}>
                    <MainMenu
                      onClick={handleMenuOnDesktop}
                      selectedKeys={['main--menu-home']}
                      defaultSelectedKeys={menuActivedKeys}
                    />
                  </Col>
                </Row>
              </Col>
              <Col className="text-right" xs={8} sm={8} xxl={6} xl={6} lg={9} md={9}>
                <RightMenu
                  profile={{
                    userId: profile.userId,
                    avatar: profile.avatar,
                    fullName: profile.fullName,
                  }}
                  isAuthenticated={isAuthenticated}
                  onSignIn={handleSignIn}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Drawer title={null} placement="left" closable={true} onClose={onClose} visible={visible}>
          <MainMenu
            defaultSelectedKeys={['main--menu-home']}
            selectedKeys={menuActivedKeys}
            onClick={handleMenuOnDrawer}
            mode="vertical-left"
          />
        </Drawer>
      </Layout.Header>
    </div>
  )
}
