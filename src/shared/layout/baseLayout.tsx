import React from 'react'
//#region nextjs components
// #endregion
//#region  antd components
import { Layout } from 'antd'

//#endregion
//#region  components
import { Header } from './Header'
//#endregion

interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  isAuthenticated?: boolean
  signOut?: () => void
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, signOut }) => {
  return (
    <Layout style={{ minHeight: '100vh' }} className="app-layout base-layout">
      <Header signOut={signOut} />
      <Layout.Content className="main-wrapper">{children}</Layout.Content>
      <Layout.Footer>©2021 by TrangKute </Layout.Footer>
    </Layout>
  )
}
