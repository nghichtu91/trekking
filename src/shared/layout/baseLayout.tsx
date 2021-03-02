import React from "react";
import { Layout, Menu } from "antd";
interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  return (
    <Layout className="app-layout base-layout">
      <Layout.Header>
        <Menu mode="horizontal">
          <Menu.Item key="home">Trang chủ</Menu.Item>
          <Menu.Item key="sell">Mua</Menu.Item>
          <Menu.Item key="buy">Bán</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content> {props.children} </Layout.Content>
      <Layout.Footer>©2021 by ThanhLe </Layout.Footer>
    </Layout>
  );
};
