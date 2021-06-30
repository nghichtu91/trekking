import React from 'react'
// import { Image } from 'antd'
import Image from 'next/image'
interface CompanyProps {
  name?: string
  companyId?: string | number
}

export const Company: React.FC<CompanyProps> = ({ companyId }) => {
  if (!companyId) return null
  return <Image width={32} height={32} src={`/company/${companyId}.jpeg`} />
}
