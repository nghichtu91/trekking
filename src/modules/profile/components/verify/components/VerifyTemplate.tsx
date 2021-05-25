import React from 'react'
import { Typography, Space, Form, Input, Button, Card } from 'antd'

type VerifyTemplateType = 'email' | 'phone' | 'cmnd'

interface VerifyTemplateProps {
  type: VerifyTemplateType
  title?: string | React.ReactNode
}

export const VerifyTemplate: React.FC<VerifyTemplateProps> = props => {
  return (
    <Card
      title={props.title ? props.title : <Typography.Text>Xác minh</Typography.Text>}
      className="mb-5"
    >
      <Form layout="vertical">
        <Form.Item className="text-center ">
          <Typography.Title level={3}> Xác thực email </Typography.Title>
        </Form.Item>
        <Form.Item label="Nhập mã otp" name="email">
          <Input />
        </Form.Item>

        <Form.Item className="text-center mb-0">
          <Space>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
