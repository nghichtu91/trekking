import React from 'react'
import { Trans } from 'next-i18next'
import { UserOutlined, LockOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons'
import { Row, Col, Divider, Button, Typography, Space, Card, Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'
import styles from './styles/signIn.module.scss'

interface OnboardTemplateProps {
  onSubmit?: () => void
  form?: FormInstance
  loading?: boolean
  signInWithGooogle?: () => void
  signInWithFacebook?: () => void
  signInHandle?: (opt: unknown) => void
  signUpHandle?: () => void
}

interface SignInFieldProps {
  username: string
  password: string
}

export const SignIn: React.FC<OnboardTemplateProps> = ({
  signInWithFacebook,
  signInWithGooogle,
  signInHandle,
  signUpHandle,
  form,
  loading,
}) => {
  const [signInForm] = Form.useForm<SignInFieldProps>()

  return (
    <Row id={styles['signin']} className="onboard-container" justify="center">
      <Col xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
        <Card>
          <Typography.Title className="text-center" level={3}>
            <Trans i18nKey="auth-sigin-text">Đăng nhập</Trans>
          </Typography.Title>
          <Space style={{ width: '100%' }} direction="vertical">
            <Button
              onClick={signInWithFacebook}
              size="large"
              icon={<FacebookFilled size={40} />}
              className={`${styles['btn--social']} ${styles['btn--social--fb']}`}
            >
              Facebook
            </Button>
            <Button
              onClick={signInWithGooogle}
              size="large"
              icon={<GoogleCircleFilled />}
              className={`${styles['btn--social']} ${styles['btn--social--gg']}`}
            >
              Google
            </Button>
          </Space>
          <Divider plain>Hoặc</Divider>
          <Form
            form={form || signInForm}
            autoComplete="false"
            className="signin-form"
            slot="signin-form"
            size="large"
            onFinish={signInHandle}
          >
            <Form.Item name="username">
              <Input
                allowClear
                id="signin-username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Số điện thoại hoặc email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              extra={
                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
              }
            >
              <Input.Password
                allowClear
                autoComplete="false"
                id="signin-password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button
                loading={loading}
                htmlType="submit"
                size="large"
                type="primary"
                style={{ width: '100%' }}
              >
                Đăng nhập
              </Button>
              <Typography className={styles['not-have-account']}>
                Bạn chưa có tài khoản?
                <Button onClick={signUpHandle} className={styles['btn-signup']} type="link">
                  Đăng ký
                </Button>
              </Typography>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
