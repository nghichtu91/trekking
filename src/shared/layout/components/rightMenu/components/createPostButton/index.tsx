import { Typography, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'

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
