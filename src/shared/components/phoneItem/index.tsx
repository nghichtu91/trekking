import React from 'react'

import { Form } from 'antd'
import { FormItemProps, Rule } from 'antd/lib/form'
import { VN_PHONE_PATTERN } from '@shared/constants/patterns'
import { useTranslation } from 'next-i18next'

export type PhoneItemProps = FormItemProps
export const PhoneItem: React.FC<PhoneItemProps> = props => {
  const { t } = useTranslation()

  const RequiredRules: Rule[] = [
    {
      required: true,
    },
    {
      pattern: VN_PHONE_PATTERN,
      message: t('authentication.signUp.phoneNotValid'),
    },
  ]
  const concatWithProps = props.rules ? RequiredRules.concat(props.rules) : RequiredRules

  return (
    <Form.Item
      messageVariables={{
        label: t('authentication.signUp.phone'),
      }}
      {...props}
      rules={concatWithProps}
    >
      {props.children}
    </Form.Item>
  )
}
