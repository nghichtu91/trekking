import React from 'react'

import { Button, Typography, Form, Input } from 'antd'
import { Trans, useTranslation } from 'next-i18next'
import { FormInstance, Rule } from 'antd/lib/form'
import { RequiredItem } from '@shared/components'
import { VERIFY_NUMBER_PATTERN } from '@shared/constants/patterns'
export interface VerifyFields {
  email: string
  phone: string
}

export interface VerifyProps extends React.HTMLAttributes<HTMLDivElement> {
  send?: (opts: unknown) => void
  form?: FormInstance
  reSend?: (opts: unknown) => void
  loading?: boolean
  errors?: Record<string, unknown>[]
  username?: string
}

export const Verify: React.FC<VerifyProps> = ({
  send,
  form,
  className,
  reSend,
  loading = false,
}) => {
  const { t } = useTranslation()
  const [verifyForm] = Form.useForm<VerifyProps>()
  const pinRules: Rule[] = [
    {
      pattern: VERIFY_NUMBER_PATTERN,
      message: t('verifyOTP.pinNotValid'),
    },
  ]
  return (
    <div className={className}>
      <Form
        layout="vertical"
        onFinish={send}
        form={form || verifyForm}
        className="verify-form"
        slot="verify-form"
        size="large"
        scrollToFirstError
      >
        <RequiredItem
          hasFeedback
          messageVariables={{
            label: t('verifyOTP.labelPin'),
          }}
          rules={pinRules}
          name="pin"
        >
          <Input autoComplete="false" id="verify-pin" placeholder={t('verifyOTP.pleaseEnterPin')} />
        </RequiredItem>

        <Form.Item className="text-center" noStyle>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            <Trans i18nKey="verifyOTP.confirm" />
          </Button>
          <Typography style={{ marginTop: 10, textAlign: 'center' }}>
            <Trans i18nKey="verifyOTP.receivedOTP">
              Bạn chưa nhận được mã OTP hoặc mã đã hết hạn?
            </Trans>
            <Button onClick={reSend} style={{ padding: 0, paddingLeft: 5 }} type="link">
              <Trans i18nKey="verifyOTP.retry">Gửi lại</Trans>
            </Button>
          </Typography>
        </Form.Item>
      </Form>
    </div>
  )
}
