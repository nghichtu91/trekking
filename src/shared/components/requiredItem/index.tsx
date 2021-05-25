import React from 'react'

import { Form } from 'antd'
import { FormItemProps, Rule } from 'antd/lib/form'
export type RequiredItemProps = FormItemProps

export const RequiredItem: React.FC<RequiredItemProps> = props => {
  const RequiredRules: Rule[] = [
    {
      required: true,
    },
  ]
  const concatWithProps = props.rules ? RequiredRules.concat(props.rules) : RequiredRules

  return (
    <Form.Item {...props} rules={concatWithProps}>
      {props.children}
    </Form.Item>
  )
}
