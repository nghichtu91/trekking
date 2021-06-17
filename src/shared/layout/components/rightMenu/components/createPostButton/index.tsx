import { Menu, Space, Popover, List, Typography, Badge, Button, Avatar, Tooltip } from 'antd'
import {
  MenuOutlined,
  LogoutOutlined,
  SafetyCertificateFilled,
  UserOutlined,
  BellOutlined,
  EditOutlined,
} from '@ant-design/icons'

export const CreatePostButton = () => {
  const align = {
    offset: [20, 10],
  }

  return (
    <Tooltip placement="bottomRight" align={align} title="Đăng bài" arrowPointAtCenter={true}>
      <Typography.Link type="secondary">
        <EditOutlined className="text-lg" />
      </Typography.Link>
    </Tooltip>
  )
}
