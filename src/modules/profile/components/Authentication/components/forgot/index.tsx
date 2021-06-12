import React from 'react'
import { Button, Typography, Form, Input, Card, Alert } from 'antd'
import { Trans, useTranslation } from 'next-i18next'
import { FormInstance } from 'antd/lib/form'
import { RequiredItem } from '@shared/components'
import styles from './styles/forgot.module.scss'
import { Rule } from 'antd/es/form'
import { VERIFY_NUMBER_PATTERN } from '@shared/constants/patterns'
import { StrongPassword } from '@shared/components'

export interface ForGotFields {
  username: string
  code?: string
  password?: string
}

export interface ForGotProps extends React.HTMLAttributes<HTMLDivElement> {
  handleGetOtp?: (opts: unknown) => void
  handleUpdateNewPassword?: (opts: unknown) => void
  hendleResendOpt?: (opts: unknown) => void
  form?: FormInstance
  loading?: boolean
  errors?: string[]
  isGetOtp?: boolean
}

export const ForGot: React.FC<ForGotProps> = props => {
  const {
    handleGetOtp = () => false,
    handleUpdateNewPassword = () => false,
    hendleResendOpt = () => false,
  } = props
  const { form, className, hidden, loading = false, isGetOtp = false, errors = [] } = props
  const { t } = useTranslation()
  const [defaultForm] = Form.useForm<ForGotFields>()
  const verifyForm = form || defaultForm

  const codeRules: Rule[] = [
    {
      pattern: VERIFY_NUMBER_PATTERN,
      message: t('authentication.forgot.optNotValid'),
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

        <StrongPassword
          name="password"
          messageVariables={{
            label: t('authentication.forgot.newPassword'),
          }}
          placeholder={t('authentication.forgot.placeholderNewPassword')}
          placeholderConfirm={t('authentication.forgot.placeholderConfirmPassword')}
        />
      </Form.Item>
    )
  }

  const onFinish = (fields: ForGotFields) => {
    return !isGetOtp ? handleGetOtp(fields) : handleUpdateNewPassword(fields)
  }

  const errorsRender = () => {
    if (errors.length === 0) return null
    return (
      <Form.Item>
        <Alert
          type="error"
          showIcon
          message={errors.map((messge, index) => (
            <Typography.Text key={index}> {messge} </Typography.Text>
          ))}
        />
      </Form.Item>
    )
  }

  // const isFormValid = () => form.getFieldsError().some(item => item.errors.length > 0)

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

        {errorsRender()}

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
          <Form.Item hidden={!isGetOtp} className="text-center mb-0">
            <Typography.Text>
              <Trans i18nKey="authentication.forgot.textMissOpt">Bạn chưa nhận mã xác nhận?</Trans>
              <Button onClick={hendleResendOpt} className={styles['btn--go-back']} type="link">
                <Trans i18nKey="authentication.forgot.textBtnTryAgain">Lấy lại</Trans>
              </Button>
            </Typography.Text>
          </Form.Item>
        </Form.Item>
      </Form>
    </Card>
  )
}
