import React from 'react'

import { Button, Typography, Form, Input, Card } from 'antd'
import { Trans, useTranslation } from 'next-i18next'
import { FormInstance } from 'antd/lib/form'
import { RequiredItem } from '@shared/components'
import styles from './styles/forgot.module.scss'

export interface ForGotFields {
  email: string
  phone: string
}

export interface ForGotProps extends React.HTMLAttributes<HTMLDivElement> {
  send?: (opts: unknown) => void
  form?: FormInstance
  goBack?: (opts: unknown) => void
  loading?: boolean
  errors?: Record<string, unknown>[]
  username?: string
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

  return (
    <Card hidden={hidden} className={`${styles['forgot']} ${className}`}>
      <Typography.Title className="text-center" level={3}>
        <Trans i18nKey="authentication.signIn.titleHeader">Quên mật khẩu</Trans>
      </Typography.Title>
      <Form
        layout="vertical"
        onFinish={send}
        form={form || verifyForm}
        className="forgot--form"
        size="large"
        scrollToFirstError
      >
        <RequiredItem
          hasFeedback
          messageVariables={{
            label: t('authentication.forgot.labelUsername'),
          }}
          name="username"
        >
          <Input
            autoComplete="false"
            id="verify-pin"
            placeholder={t('authentication.forgot.placeholderUsername')}
          />
        </RequiredItem>
        <Form.Item className="text-center" noStyle>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
          >
            <Trans i18nKey="authentication.forgot.txtReset">Lấy mã</Trans>
          </Button>
          <Form.Item className="text-center">
            <Button onClick={goBack} className={styles['btn--go-back']} type="link">
              <Trans i18nKey="authentication.forgot.backSignIn">Quay lại đăng nhập</Trans>
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </Card>
  )
}
