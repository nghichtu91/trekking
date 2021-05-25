import React from 'react'

import { LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Typography, Form, Input } from 'antd'
import { Trans, useTranslation } from 'next-i18next'
import { FormInstance, Rule } from 'antd/lib/form'
import { RequiredItem, PhoneItem } from '@shared/components'

export interface SignUpFields {
  email: string
  phone: string
}

export interface SignUpProps extends React.HTMLAttributes<HTMLDivElement> {
  onSignIn?: () => void
  form?: FormInstance
}

export const SignUp: React.FC<SignUpProps> = ({ onSignIn, form, className }) => {
  const { t } = useTranslation()
  const [signUpForm] = Form.useForm<SignUpFields>()

  const rePasswordCheckMatchPassword: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(t('authentication.signUp.rePasswordNotValid')))
    },
  })

  const rePasswordRules: Rule[] = [rePasswordCheckMatchPassword]

  return (
    <div className={className}>
      <Form
        layout="vertical"
        onFinish={onSignIn}
        form={form || signUpForm}
        className="signup-form"
        slot="signup-form"
        size="large"
        scrollToFirstError
      >
        <Form.Item
          messageVariables={{
            label: t('authentication.signUp.email'),
          }}
          id="add-email"
          name="email"
          hasFeedback
        >
          <Input
            type="email"
            id="signup-email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder={t('authentication.signUp.emailPlaceholder')}
          />
        </Form.Item>

        <PhoneItem hasFeedback name="phone">
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder={t('authentication.signUp.phonePlaceholder')}
          />
        </PhoneItem>

        <RequiredItem
          hasFeedback
          messageVariables={{
            label: t('authentication.signUp.password'),
          }}
          id="n-password"
          name="password"
        >
          <Input.Password
            autoComplete="false"
            id="signup-password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('authentication.signUp.passwordPlaceholder')}
          />
        </RequiredItem>

        <Form.Item
          hasFeedback
          name="rePassword"
          dependencies={['password']}
          rules={rePasswordRules}
          id="n-rePassword"
        >
          <Input.Password
            autoComplete="false"
            id="signup-repassword"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('authentication.signUp.rePasswordPlaceholder')}
          />
        </Form.Item>
        <Form.Item className="text-center" noStyle>
          <Button size="large" type="primary" style={{ width: '100%' }}>
            <Trans i18nKey="authentication.signUp.textSignUp" />
          </Button>
          <Typography style={{ marginTop: 10, textAlign: 'center' }}>
            <Trans i18nKey="authentication.signUp.textYouHaveAccount" />
            <Button onClick={onSignIn} style={{ padding: 0, paddingLeft: 5 }} type="link">
              <Trans i18nKey="authentication.signUp.textSignIn" />
            </Button>
          </Typography>
        </Form.Item>
      </Form>
    </div>
  )
}
