import React, { useState, useRef } from 'react'
//#region nextjs components
// #endregion
//#region antd
import { Layout, Row, Col, Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { LayoutProps } from 'antd/es/layout'
import { LogoSite } from './components'
//#endregion

import { MainMenu, RightMenu } from './components'
//#region constants
import { LOGO_SITE } from '@shared/constants'
//#endregion

//#region componets
import { UseAws } from '@modules/profile/hooks/useAuthe'
import { useProfile } from '@modules/profile/hooks/userProfile'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { MainMenus, ProfileMenus } from '@shared/constants/menus'

//#endregion
interface HeaderProps extends LayoutProps {
  isAuthenticated?: boolean
  logoDom?: string | React.ReactNode
}

export const Header: React.FC<HeaderProps> = () => {
  const { profile } = useProfile()
  const [isAuthenticated] = UseAws()
  const router = useRouter()
  const defaultHomeKey = 'main--menu-home'
  const [menuActivedKeys, setMenuActivedKeys] = useState<string[]>([defaultHomeKey])
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

  // const profileMenuHandle = (url?: string) => {
  //   if (!url || url !== '#') {
  //     router.push({
  //       pathname: url,
  //       query: {
  //         id: profile.userId,
  //       },
  //     })
  //   }
  //   setIsPopoverProfile(false)
  //   return false
  // }

  // const signOutHandle = () => {
  //   Auth.signOut()
  // }

  // const profileMenus = () => {
  //   return (
  //     <Row className="" justify="space-between" gutter={[0, 0]}>
  //       <Col className="p-3 border-b border-gray-200" span={24}>
  //         <Row>
  //           <Col span={6}>
  //             <Avatar size={55} src={profile.avatar} icon={<UserOutlined />} />
  //           </Col>
  //           <Col span={18}>
  //             <Typography.Title className="text-blue-500 mb-1" level={5}>
  //               {profile.fullName}
  //               {profile.identified ? (
  //                 <SafetyCertificateFilled className="align-baseline text-base text-yellow-500" />
  //               ) : null}
  //             </Typography.Title>
  //             <Typography.Text type="secondary">@{profile.username}</Typography.Text>
  //           </Col>
  //         </Row>
  //       </Col>
  //       <Col slot="popover-profile--menu" className="popover-profile--menu" span={24}>
  //         <BaseMenu onMenuclick={profileMenuHandle} className="border-0" items={ProfileMenus} />
  //       </Col>
  //       <Col className="p-3 border-t border-gray-200 hover:bg-gray-100" span={24}>
  //         <Typography.Link onClick={signOutHandle}>
  //           <LogoutOutlined className="align-text-middle" /> Thoát
  //         </Typography.Link>
  //       </Col>
  //     </Row>
  //   )
  // }

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const goToByMenuKey = (menu: string) => {
    const { uri } = MainMenus.find(item => item.key === menu)
    if (uri) {
      setMenuActivedKeys([menu])
      router.push(uri)
    }
  }

  const handleMenuOnDrawer = ({ key }) => {
    setVisible(false)
    goToByMenuKey(key)
  }

  const handleMenuOnDesktop = ({ key }) => {
    goToByMenuKey(key)
  }

  const goHome = () => {
    goToByMenuKey(defaultHomeKey)
    router.push(Routers.HomePage)
  }

  const handleSignOut = () => {
    router.push(Routers.HomePage)
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
                    <LogoSite onGoHome={goHome} src={LOGO_SITE} />
                  </Col>
                  <Col xs={0} sm={0} xxl={12} xl={12} lg={12} md={12}>
                    <MainMenu
                      onClick={handleMenuOnDesktop}
                      selectedKeys={menuActivedKeys}
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
                  onSignOut={handleSignOut}
                  profileMenu={ProfileMenus}
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
