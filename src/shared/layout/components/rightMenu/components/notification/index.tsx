import React from 'react'
import { Popover, List, Typography, Badge } from 'antd'
import Helper from '@shared/utils/helper'
import { BellOutlined } from '@ant-design/icons'
import { NotificationContent } from './components/content'

interface NotifyItem {
  id: string
  title: string
  type: string
  content?: string
}

interface NotificationProps {
  data?: NotifyItem[]
  notifycount?: number
}

export const Notification: React.FC<NotificationProps> = ({ notifycount = 0, data = [] }) => {
  const align = {
    offset: [20, 10],
  }

  return (
    <Popover
      trigger="click"
      overlayClassName="tt-popover tt-popover--notification"
      placement="bottomRight"
      arrowPointAtCenter={true}
      getPopupContainer={() => Helper.getContainer()}
      align={align}
      content={<NotificationContent />}
    >
      <Badge overflowCount={9} count={notifycount}>
        <BellOutlined className="text-lg" />
      </Badge>
    </Popover>
  )
}
