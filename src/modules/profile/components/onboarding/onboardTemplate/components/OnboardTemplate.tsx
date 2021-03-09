import React, { useState } from 'react'
// import '../styles/OnboardTemplate.module.scss'
// import {
//   AmplifyAuthenticator,
//   AmplifySignIn,
//   AmplifyFacebookButton,
//   AmplifyGoogleButton,
//   AmplifySignUp,
//   AmplifyButton,
// } from '@aws-amplify/ui-react'
// import { Auth } from 'aws-amplify'
// import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'
import {
  UserOutlined,
  LockOutlined,
  FacebookFilled,
  GoogleCircleFilled,
  PhoneFilled,
} from '@ant-design/icons'

import { Row, Col, Divider, Button, Typography, Space, Card, Form, Input } from 'antd'
type TemplateType = 'login' | 'signup'

interface OnboardTemplateProps {
  type: TemplateType
  updateFormField?: (fieldName: string, value: string) => void
  onSubmit?: () => void
}

const OnboardTemplate: React.FC<OnboardTemplateProps> = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <Row className="onboard-container" justify="center">
      <Col xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
        <Card
          style={{
            background: '#f2f2f2',
            borderColor: '#ddd',
          }}
        >
          <Typography.Title className="text-center" level={3}>
            Đăng nhập
          </Typography.Title>
          <Space style={{ width: '100%' }} direction="vertical">
            <Button
              size="large"
              icon={<FacebookFilled size={40} />}
              style={{ width: '100%', background: '#4267b2', color: '#fff', fontWeight: 400 }}
            >
              Facebook
            </Button>
            <Button size="large" icon={<GoogleCircleFilled />} style={{ width: '100%' }}>
              Google
            </Button>
          </Space>
          <Divider plain>hoặc bằng email</Divider>
          {/* <AmplifyAuthenticator usernameAlias="email">
            <AmplifySignIn />
          </AmplifyAuthenticator> */}
          <Form className="signin-form" slot="signin-form" hidden={isSignUp} size="large">
            <Form.Item name="email">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập hoặc email"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item noStyle name="password">
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <a className="login-form-forgot" href="">
                Quên mật khẩu
              </a>
            </Form.Item>
            <Form.Item noStyle>
              <Button size="large" type="primary" style={{ width: '100%' }}>
                Đăng nhập
              </Button>
              <Typography style={{ marginTop: 10, textAlign: 'center' }}>
                Bạn chưa có tài khoản?
                <Button
                  style={{ padding: 0, paddingLeft: 5 }}
                  type="link"
                  onClick={() => setIsSignUp(true)}
                >
                  Đăng ký
                </Button>
              </Typography>
            </Form.Item>
          </Form>
          <Form className="signup-form" slot="signup-form" hidden={!isSignUp} size="large">
            <Form.Item id="add-email" name="email">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập hoặc email"
              />
            </Form.Item>
            <Form.Item name="phone">
              <Input
                prefix={<PhoneFilled className="site-form-item-icon" />}
                placeholder="Số điện thoại"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item noStyle id="n-password" name="password">
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }} noStyle>
              <Button size="large" type="primary" style={{ width: '100%' }}>
                Đăng ký
              </Button>
              <Typography style={{ marginTop: 10, textAlign: 'center' }}>
                Bạn đã có tài khoản?
                <Button
                  style={{ padding: 0, paddingLeft: 5 }}
                  type="link"
                  onClick={() => setIsSignUp(false)}
                >
                  Đăng nhập
                </Button>
              </Typography>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default OnboardTemplate
