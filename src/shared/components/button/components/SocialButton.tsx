import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'

type SocialButtonType = 'Facebook' | 'Google'
interface SocialButtonProps extends ButtonProps {
  social: SocialButtonType
}

export const SocialButton: React.FC<SocialButtonProps> = props => {
  // const getClassName = () => props.socialType
  const classNames = ['social-button', props.className, props.social.toLowerCase()]
  return (
    <Button {...props} className={classNames.join(' ')}>
      {props.children}
    </Button>
  )
}
