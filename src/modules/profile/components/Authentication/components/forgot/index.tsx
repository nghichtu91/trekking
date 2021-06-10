import React, { useState } from 'react'

import { Button, Typography, Form, Input, Card, Alert } from 'antd'
import { Trans, useTranslation } from 'next-i18next'
import { FormInstance } from 'antd/lib/form'
import { RequiredItem } from '@shared/components'
import styles from './styles/forgot.module.scss'
import { Rule } from 'antd/es/form'
import { VERIFY_NUMBER_PATTERN } from '@shared/constants/patterns'

export interface ForGotFields {
  username: string
  code?: string
  password?: string
}

export interface ForGotProps extends React.HTMLAttributes<HTMLDivElement> {
  send?: (opts: unknown) => void
  form?: FormInstance
  goBack?: () => void
  loading?: boolean
  errors?: Record<string, unknown>[]
}

export const ForGot: React.FC<ForGotProps> = ({
  send,
  form,
  className,
  goBack,
  loading = false,
  hidden,
}) => {
  const { t } = useTranslation()
  const [verifyForm] = Form.useForm<ForGotFields>()
  const [isSend, setIsSend] = useState<boolean>(false)
  const codeRules: Rule[] = [
    {
      pattern: VERIFY_NUMBER_PATTERN,
      message: 'Mã xác thực không hợp lệ',
    },
  ]

  const afterSendRend = () => {
    if (!isSend) return null
    return (
      <Form.Item noStyle>
        <RequiredItem
          messageVariables={{
            label: t('authentication.forgot.pin'),
          }}
          name="code"
          rules={codeRules}
        >
          <Input
            autoComplete="false"
            id="forgot-code"
            placeholder={t('authentication.forgot.placeholderCode')}
          />
        </RequiredItem>

        <RequiredItem
          messageVariables={{
            label: t('authentication.forgot.repassword'),
          }}
        >
          <Input.Password
            allowClear
            autoComplete="false"
            id="forgot-new-password"
            placeholder={t('authentication.forgot.placeholderNewPassword')}
          />
        </RequiredItem>
        <RequiredItem>
          <Input.Password
            allowClear
            autoComplete="false"
            id="forgot-renew-password"
            placeholder={t('authentication.forgot.placeholderReNewPassword')}
          />
        </RequiredItem>
      </Form.Item>
    )
  }

  const handleGoBackSignIn = () => {
    setIsSend(false)
    verifyForm.resetFields()
    goBack()
  }

  const handleGetOpt = (fields: ForGotFields) => {
    if (!isSend) {
      setIsSend(true)
      send(fields)
    }
  }

  const onFinish = (fields: ForGotFields) => {
    handleGetOpt(fields)
  }

  return (
    <Card hidden={hidden} className={`${styles['forgot']} ${className}`}>
      <Typography.Title className="text-center" level={3}>
        <Trans i18nKey="authentication.signIn.titleHeader">Quên mật khẩu</Trans>
      </Typography.Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form || verifyForm}
        className="forgot--form"
        size="large"
        scrollToFirstError
      >
        <Form.Item hidden={!isSend}>
          <Alert message="Chúng tôi đã gửi 1 xác nhận vào email hoặc số điện thoại."></Alert>
        </Form.Item>
        <RequiredItem
          hidden={isSend}
          hasFeedback
          messageVariables={{
            label: t('authentication.forgot.username'),
          }}
          name="username"
        >
          <Input
            autoComplete="false"
            id="verify-pin"
            placeholder={t('authentication.forgot.placeholderUsername')}
          />
        </RequiredItem>
        {afterSendRend()}
        <Form.Item className="text-center" noStyle>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
            hidden={isSend}
          >
            <Trans i18nKey="authentication.forgot.txtReset">Lấy mã</Trans>
          </Button>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
            hidden={!isSend}
          >
            <Trans i18nKey="authentication.forgot.txtUpdate">Cập nhật</Trans>
          </Button>
          <Form.Item className="text-center mb-0">
            <Button onClick={handleGoBackSignIn} className={styles['btn--go-back']} type="link">
              <Trans i18nKey="authentication.forgot.backSignIn">Quay lại đăng nhập</Trans>
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </Card>
  )
}
