import React from 'react'
import { List, Typography, Button, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

interface NotifyItem {
  id: string
  title: string
  type: string
  content?: string
}

interface NotificationContentProps {
  notifies?: NotifyItem[]
}

export const NotificationContent: React.FC<NotificationContentProps> = ({ notifies = [] }) => {
  return (
    <List
      locale={{ emptyText: 'Không có thông báo' }}
      bordered
      header={
        <Typography className="inline-flex w-full">
          <Typography.Text strong className="flex flex-1 justify-start">
            Notifications
          </Typography.Text>
          <Button
            style={{ height: 'inherit' }}
            className="flex flex-1 justify-end"
            type="link"
            icon={<SettingOutlined />}
          />
        </Typography>
      }
      footer={null}
      dataSource={notifies}
      renderItem={item => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
  )
}
