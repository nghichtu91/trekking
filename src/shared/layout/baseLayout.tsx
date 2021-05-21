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
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Layout className="app-layout base-layout">
      <Header />
      <Layout.Content className="main-wrapper">{children}</Layout.Content>
      <Layout.Footer>©2021 by TrangKute </Layout.Footer>
    </Layout>
  )
}
