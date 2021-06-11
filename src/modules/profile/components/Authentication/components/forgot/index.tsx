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
  handleGetOtp?: (opts: unknown) => void
  handleUpdateNewPassword?: (opts: unknown) => void
  form?: FormInstance
  goBack?: () => void
  loading?: boolean
  errors?: string[]
  isGetOtp?: boolean
}

export const ForGot: React.FC<ForGotProps> = props => {
  const { goBack, handleGetOtp = () => false, handleUpdateNewPassword = () => false } = props
  const { form, className, hidden, loading = false, isGetOtp = false } = props
  const { t } = useTranslation()
  const [defaultForm] = Form.useForm<ForGotFields>()
  const verifyForm = form || defaultForm

  const codeRules: Rule[] = [
    {
      pattern: VERIFY_NUMBER_PATTERN,
      message: t('authentication.forgot.codeNotValid'),
    },
  ]

  const afterGetOtpSuccessRend = () => {
    if (!isGetOtp) return null
    return (
      <Form.Item noStyle>
        <RequiredItem
          messageVariables={{
            label: t('authentication.forgot.code'),
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
          name="password"
          messageVariables={{
            label: t('authentication.forgot.newPassword'),
          }}
        >
          <Input.Password
            allowClear
            autoComplete="false"
            id="forgot-new-password"
            placeholder={t('authentication.forgot.placeholderNewPassword')}
          />
        </RequiredItem>
        <RequiredItem name="confirm-password">
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

  const onFinish = (fields: ForGotFields) => {
    return !isGetOtp ? handleGetOtp(fields) : handleUpdateNewPassword(fields)
  }

  return (
    <Card hidden={hidden} className={`${styles['forgot']} ${className}`}>
      <Typography.Title className="text-center" level={3}>
        <Trans i18nKey="authentication.forgot.titleHeader">Quên mật khẩu</Trans>
      </Typography.Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={verifyForm}
        className="forgot--form"
        size="large"
        scrollToFirstError
      >
        <Form.Item hidden={!isGetOtp}>
          <Alert message={<Trans i18nKey="authentication.forgot.getOptSuccess" />} />
        </Form.Item>
        <RequiredItem
          hidden={isGetOtp}
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
        {afterGetOtpSuccessRend()}
        <Form.Item className="text-center" noStyle>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
            hidden={isGetOtp}
          >
            <Trans i18nKey="authentication.forgot.txtReset">Lấy mã</Trans>
          </Button>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
            hidden={!isGetOtp}
          >
            <Trans i18nKey="authentication.forgot.txtUpdate">Cập nhật</Trans>
          </Button>
          <Form.Item className="text-center mb-0">
            <Button onClick={goBack} className={styles['btn--go-back']} type="link">
              <Trans i18nKey="authentication.forgot.backSignIn">Quay lại đăng nhập</Trans>
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </Card>
  )
}
