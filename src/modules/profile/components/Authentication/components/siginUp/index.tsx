import React from 'react'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Typography, Form, Input } from 'antd'
import { Trans, useTranslation } from 'next-i18next'
import { FormInstance, Rule } from 'antd/lib/form'
import { RequiredItem, PhoneItem } from '@shared/components'
import { EMAIL_PATTERN } from '@shared/constants/patterns'
import { StrongPassword } from '@shared/components/strongPassword'

export interface SignUpFields {
  email: string
  phone: string
  password: string
}

export interface SignUpProps extends React.HTMLAttributes<HTMLDivElement> {
  onSignUp?: (opts: unknown) => void
  onSignIn?: (opts: unknown) => void
  form?: FormInstance
  loading?: boolean
  errors?: Record<string, unknown>[]
}

export const SignUp: React.FC<SignUpProps> = ({
  onSignUp,
  form,
  className,
  onSignIn,
  loading = false,
}) => {
  const { t } = useTranslation()
  const [signUpForm] = Form.useForm<SignUpFields>()

  const emailRules: Rule[] = [
    {
      pattern: EMAIL_PATTERN,
      message: t('authentication.signUp.emailNotValid'),
    },
  ]

  return (
    <div className={className}>
      <Form
        layout="vertical"
        onFinish={onSignUp}
        form={form || signUpForm}
        className="signup-form"
        slot="signup-form"
        size="large"
        scrollToFirstError
      >
        <PhoneItem hasFeedback name="phone">
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder={t('authentication.signUp.phonePlaceholder')}
          />
        </PhoneItem>

        <RequiredItem
          messageVariables={{
            label: t('authentication.signUp.email'),
          }}
          rules={emailRules}
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
        </RequiredItem>
        <StrongPassword
          messageVariables={{
            label: t('authentication.signUp.password'),
          }}
        />
        <Form.Item className="text-center" noStyle>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
          >
            <Trans i18nKey="authentication.signUp.textSignUp" />
          </Button>
          <Typography className="text-center" style={{ marginTop: 10 }}>
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
