import React from 'react'
import { SocialButton } from './SocialButton'
import { FacebookFilled } from '@ant-design/icons'

export const FacebookButton = () => {
  return (
    <SocialButton size="large" icon={<FacebookFilled className="align-middle" />} social="Facebook">
      Facebook
    </SocialButton>
  )
}
