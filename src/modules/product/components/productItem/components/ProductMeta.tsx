import React from 'react'
import { Typography } from 'antd'

interface ProductMetaProps {
  a?: string
}

export const ProductMeta: React.FC<ProductMetaProps> = () => {
  return (
    <div>
      {/* <Typography>
        <Space>
          <Typography.Text strong>Kênh: 1900 </Typography.Text>
          <Typography.Text strong>Quốc Gia: La Mã</Typography.Text>
          <Typography.Text strong>Sức mạnh: 100m</Typography.Text>
          <Typography.Text strong>
            <Popover content="898989"> Quân đội: 100m lính </Popover>
          </Typography.Text>
          <Typography.Text strong>
            <Popover content="898989"> Tài nguyên: 100m </Popover>
          </Typography.Text>
          <Typography.Text strong>Vé bay: 3</Typography.Text>
        </Space>
      </Typography> */}
      <Typography>Thông tin cần mua/bán</Typography>
    </div>
  )
}
