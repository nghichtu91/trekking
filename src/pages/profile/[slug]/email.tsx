import React from 'react'
import { PageWrapper } from '@shared/components/wrapper'
import { VerifyTemplate } from '@modules/profile/components/verify'

const VerifyPage: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <PageWrapper>
      <VerifyTemplate type="email" />
    </PageWrapper>
  )
}

export default VerifyPage
