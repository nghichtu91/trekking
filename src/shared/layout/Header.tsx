import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import Helper from '@shared/utils/helper'
//#region nextjs components
import Link from 'next/link'
import Image from 'next/image'
// #endregion
//#region antd
import {
  Layout,
  Menu,
  Row,
  Avatar,
  Col,
  Typography,
  Space,
  Popover,
  List,
  Badge,
  Tooltip,
} from 'antd'
import {
  MenuOutlined,
  InfoCircleFilled,
  LogoutOutlined,
  SafetyCertificateFilled,
  UserOutlined,
  BellOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { LayoutProps } from 'antd/es/layout'
//#endregion

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

  const logoDom = () => {
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
          <Typography.Link onClick={() => Auth.signOut()}>
            <LogoutOutlined className="align-text-middle" /> Thoát
          </Typography.Link>
        </Col>
      </Row>
    )
  }

  const InformationRender = () => {
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ]

    return (
      <Popover
        trigger="click"
        overlayClassName="tt-popover"
        placement="bottom"
        getPopupContainer={() => Helper.getContainer()}
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
          <Typography.Link id="badge-information">
            <InfoCircleFilled className="text-lg" />
          </Typography.Link>
        </Badge>
      </Popover>
    )
  }

  const AuthenticatedRender = () => {
    return isAuthenticated ? (
      <>
        <Badge overflowCount={9} count={9}>
          <BellOutlined className="text-lg" />
        </Badge>
        <Tooltip
          placement="bottomRight"
          align={{
            offset: [20, 11],
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
          <Typography.Link
            className="block"
            onClick={() => setIsPopoverProfile(true)}
            type="secondary"
          >
            <Avatar src={profile.avatar} icon={<UserOutlined id="fdfdf" />} />
          </Typography.Link>
        </Popover>
      </>
    ) : (
      <Link href={Routers.RegisterPage}>Đăng ký/Đăng nhập</Link>
    )
  }

  const rightComponentRender = () => {
    return (
      <Col className="menu-row text-right" xs={20} sm={20} xxl={15} xl={15} lg={15} md={15}>
        <Row gutter={[0, 0]} justify="space-around">
          <Col xs={0} sm={0} xxl={16} xl={16} lg={16} md={16}>
            <Menu
              overflowedIndicator={<MenuOutlined />}
              className="text-right"
              id="nav"
              direction="ltr"
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link href="/"> Trang chủ</Link>
              </Menu.Item>
              <Menu.Item key="sell">
                <Link href="/sell"> Mua</Link>
              </Menu.Item>
              <Menu.Item key="buy">
                <Link href="/buy"> Bán</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col xs={24} sm={24} xxl={8} xl={8} lg={8} md={8}>
            <Space size={32}>
              {InformationRender()}
              {AuthenticatedRender()}
            </Space>
          </Col>
        </Row>
      </Col>
    )
  }

  return (
    <Layout.Header className="px-4" id="header">
      <Row gutter={[0, 0]} justify="center">
        <Col xs={24} sm={24} xxl={15} xl={15} lg={18} md={18}>
          <Row justify="space-between">
            <Col xs={4} sm={4} xxl={9} xl={9} lg={9} md={9}>
              {logoDom()}
            </Col>
            {rightComponentRender()}
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  )
}
