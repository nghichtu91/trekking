import React from 'react'
import { Image } from 'antd'

interface CompanyProps {
  name?: string
  companyId?: string
}

export const Company: React.FC<CompanyProps> = () => {
  return (
    <Image
      preview={false}
      width={32}
      height={32}
      src="https://cdn.printgo.vn/uploads/media/761388/toyota4_1559754409.jpg"
    />
  )
}
