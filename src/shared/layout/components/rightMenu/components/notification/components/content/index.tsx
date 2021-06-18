import React from 'react'
import { List, Typography, Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useTranslation, Trans } from 'next-i18next'

interface NotifyItem {
  id: string
  title: string
  type: string
  content?: string
  url?: string
}

interface NotificationContentProps {
  notifies?: NotifyItem[]
}

export const NotificationContent: React.FC<NotificationContentProps> = ({ notifies = [] }) => {
  const { t } = useTranslation()
  const emptyText = t('notification.empty')

  const HeaderRender = () => {
    return (
      <Typography className="inline-flex w-full sticky">
        <Typography.Text strong className="flex flex-1 justify-start">
          <Trans i18nKey="notification.titleHeader">Thông báo</Trans>
        </Typography.Text>
        <Button
          style={{ height: 'inherit' }}
          className="flex flex-1 justify-end"
          type="link"
          icon={<SettingOutlined />}
        />
      </Typography>
    )
  }

  return (
    <List
      locale={{ emptyText }}
      bordered
      header={HeaderRender()}
      footer={null}
      dataSource={notifies}
      renderItem={({ id, title }) => (
        <List.Item key={id}>
          <Typography.Text mark></Typography.Text> {title}
        </List.Item>
      )}
    />
  )
}
