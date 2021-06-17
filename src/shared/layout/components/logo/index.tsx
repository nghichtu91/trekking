import React from 'react'
import { Button } from 'antd'
import Image from 'next/image'
import styles from './styles/logo.module.scss'

interface LogoSiteProps {
  src: string
  onGoHome?: () => void
}

export const LogoSite: React.FC<LogoSiteProps> = ({ src, onGoHome = () => false }) => {
  return (
    <Button
      onClick={onGoHome}
      className={`align-middle inline-block ${styles['logo']}`}
      type="link"
    >
      <Image src={src} width={48} height={48} />
    </Button>
  )
}
