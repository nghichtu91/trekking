import React from 'react'
import { Popover, Badge } from 'antd'
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
  notifies?: NotifyItem[]
  notifycount?: number
}

export const Notification: React.FC<NotificationProps> = ({ notifycount = 0, notifies = [] }) => {
  const align = {
    offset: [20, 10],
  }
  const notifisTest: NotifyItem[] = [
    {
      id: '1',
      type: 'styem',
      title: 'Thông báo thức nhất',
    },
    {
      id: '2',
      type: 'styem',
      title: 'Thông báo thức nhất',
    },
    {
      id: '2',
      type: 'styem',
      title: 'Thông báo thức nhất',
    },
    {
      id: '3',
      type: 'styem',
      title: 'Thông báo thức nhất',
    },
    {
      id: '4',
      type: 'styem',
      title: 'Thông báo thức nhất',
    },
    {
      id: '5',
      type: 'styem',
      title: 'Thông báo thức nhất',
    },
  ]
  return (
    <Popover
      trigger="click"
      overlayClassName="tt-popover tt-popover--notification"
      placement="bottomRight"
      arrowPointAtCenter={true}
      getPopupContainer={() => Helper.getContainer()}
      align={align}
      content={<NotificationContent notifies={notifisTest || notifies} />}
    >
      <Badge overflowCount={9} count={notifycount}>
        <BellOutlined className="text-lg" />
      </Badge>
    </Popover>
  )
}
