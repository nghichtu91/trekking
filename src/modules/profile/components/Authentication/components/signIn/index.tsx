import React from 'react'
import { Trans, useTranslation } from 'next-i18next'
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
  const { t } = useTranslation()
  return (
    <Row id={styles['signin']} className="onboard-container" justify="center">
      <Col xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
        <Card>
          <Typography.Title className="text-center" level={3}>
            <Trans i18nKey="authentication.signIn.titleHeader">Đăng nhập</Trans>
          </Typography.Title>
          <Space className="w-full" direction="vertical">
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
          <Divider plain>
            <Trans i18nKey="authentication.signIn.textOr">Hoặc</Trans>
          </Divider>
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
                placeholder={t('authentication.signIn.userNamePlaceholder')}
              />
            </Form.Item>
            <Form.Item
              name="password"
              extra={
                <a className="login-form-forgot" href="">
                  <Trans i18nKey="authentication.signIn.forGotPassword">Quên mật khẩu</Trans>
                </a>
              }
            >
              <Input.Password
                allowClear
                autoComplete="false"
                id="signin-password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t('authentication.signIn.passwordPlaceholder')}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button
                loading={loading}
                htmlType="submit"
                size="large"
                type="primary"
                className="w-full"
              >
                <Trans i18nKey="authentication.signIn.textSignIn">Đăng nhập</Trans>
              </Button>
              <Typography className={styles['not-have-account']}>
                <Trans i18nKey="authentication.signIn.textYouNotHaveAccount">
                  Bạn chưa có tài khoản?
                </Trans>
                <Button onClick={signUpHandle} className={styles['btn-signup']} type="link">
                  <Trans i18nKey="authentication.signIn.textSignUp">Đăng ký</Trans>
                </Button>
              </Typography>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
