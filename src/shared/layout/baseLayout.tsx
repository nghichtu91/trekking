import React from 'react'
import { Layout, Menu, Row, Col, Typography, Avatar, Space } from 'antd'
import Image from 'next/image'
import { UserOutlined, MenuOutlined } from '@ant-design/icons'
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
          <Col xs={24} sm={24} xxl={14} xl={14} lg={17} md={17}>
            <Row justify="space-between">
              <Col xxl={4} xl={5} lg={6} md={6} xs={20} sm={20}>
                <Typography.Title className="h-full">
                  <a href="/" className="align-middle inline-block" style={{ height: 32 }}>
                    <Image src="/logo/logo_pc1.png" width={32} height={32} />
                  </a>
                </Typography.Title>
              </Col>
              <Col className="menu-row" xs={4} sm={4} xxl={20} xl={19} lg={18} md={18}>
                <Row justify="end">
                  <Col span={24}>
                    <Menu
                      overflowedIndicator={<MenuOutlined />}
                      className="text-right"
                      onClick={menuHandle}
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
                      <Menu.Item key="cccccc">
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
                      </Menu.Item>
                    </Menu>
                  </Col>
                  {/* <Col span={4}>
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
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content className="main-wrapper">{children}</Layout.Content>
      <Layout.Footer>©2021 by TrangKute </Layout.Footer>
    </Layout>
  )
}
