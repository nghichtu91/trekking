import React from 'react'
import { Input, Form } from 'antd'
import { RequiredItem } from '../requiredItem'
import { FormItemProps, Rule } from 'antd/es/form'
import { useTranslation } from 'next-i18next'
import { LockOutlined } from '@ant-design/icons'

interface StrongPasswordProps extends FormItemProps {
  placeholder?: string
  placeholderConfirm?: string
}

export const StrongPassword: React.FC<StrongPasswordProps> = props => {
  const { placeholder, placeholderConfirm } = props
  const { t } = useTranslation()
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/g
  const passwordRules: Rule[] = [
    {
      min: 8,
    },
    {
      pattern,
      message: t('authentication.forgot.passwordNotValid'),
    },
  ]

  const rePasswordCheckMatchPassword: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(t('authentication.signUp.rePasswordNotValid')))
    },
  })

  return (
    <>
      <RequiredItem name="password" {...props} rules={passwordRules}>
        <Input.Password
          placeholder={placeholder || t('authentication.forgot.placeholderNewPassword')}
          allowClear
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </RequiredItem>
      <Form.Item
        messageVariables={{
          label: t('authentication.forgot.confirmPassword'),
        }}
        name="confirm-password"
        rules={[rePasswordCheckMatchPassword]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={placeholderConfirm || t('authentication.forgot.placeholderConfirmPassword')}
          allowClear
        />
      </Form.Item>
    </>
  )
}
