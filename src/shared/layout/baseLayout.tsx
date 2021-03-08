import React from 'react'
import { Layout, Menu, Row, Col, Typography, Avatar, Space } from 'antd'
import Image from 'next/image'
import { UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  isAuthenticated: boolean
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ isAuthenticated, children }) => {
  const menuHandle = ({ key }) => {
    console.log(key)
  }

  return (
    <Layout className="app-layout base-layout">
      <Layout.Header id="header">
        <Row justify="space-around">
          <Col xs={24} sm={24} xxl={10} xl={12} lg={14} md={14}>
            <Row justify="space-between">
              <Col xxl={4} xl={5} lg={6} md={6} xs={24} sm={24}>
                <Typography.Title>
                  <Image src="/logo/logo_pc1.png" width={32} height={32} />
                </Typography.Title>
              </Col>
              <Col className="menu-row" xs={0} sm={0} xxl={20} xl={19} lg={18} md={18}>
                <Row justify="end">
                  <Col>
                    <Menu onClick={menuHandle} id="nav" direction="ltr" mode="horizontal">
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
                  <Col>
                    {isAuthenticated ? (
                      <Space>
                        <Typography.Link>
                          <Link href="/profile">
                            <Avatar icon={<UserOutlined />} />
                          </Link>
                        </Typography.Link>
                        <Typography.Link onClick={() => Auth.signOut()}>Thoát</Typography.Link>
                      </Space>
                    ) : (
                      <Link href="/reg">Đăng ký/Đăng nhập</Link>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content className="main-wrapper">
        <Row justify="space-around">
          <Col xs={24} sm={24} xxl={10} xl={12} lg={14} md={14}>
            {children}
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer>©2021 by ThanhLe </Layout.Footer>
    </Layout>
  )
}
