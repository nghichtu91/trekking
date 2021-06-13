import React from 'react'
import { Trans, useTranslation } from 'next-i18next'
import { UserOutlined, LockOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons'
import { Divider, Button, Typography, Space, Card, Form, Input, Alert } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { CardProps } from 'antd/lib/card'
import styles from './styles/signIn.module.scss'

interface OnboardTemplateProps extends CardProps {
  onSubmit?: () => void
  form?: FormInstance
  loading?: boolean
  signInWithGooogle?: () => void
  signInWithFacebook?: () => void
  signInHandle?: (opt: unknown) => void
  signUpHandle?: () => void
  forgotPassword?: () => void
  errors?: string[]
}

export interface SignInField {
  username: string
  password: string
}

export const SignIn: React.FC<OnboardTemplateProps> = props => {
  const [signInForm] = Form.useForm<SignInField>()
  const { t } = useTranslation()
  const {
    signInWithFacebook,
    signInWithGooogle,
    signInHandle,
    signUpHandle,
    form,
    loading,
    errors,
    forgotPassword,
    hidden,
    className,
  } = props

  return (
    <Card
      bordered={false}
      className={`${className}`}
      id={styles['signin']}
      loading={false}
      hidden={hidden}
    >
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
        <Form.Item hidden={errors.length === 0}>
          <Alert
            showIcon
            type="error"
            message={errors.map((error, index) => (
              <Typography.Text key={index}>{error}</Typography.Text>
            ))}
          />
        </Form.Item>
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
            <Typography.Link onClick={forgotPassword} className="login-form-forgot">
              <Trans i18nKey="authentication.signIn.forGotPassword">Quên mật khẩu</Trans>
            </Typography.Link>
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
  )
}
