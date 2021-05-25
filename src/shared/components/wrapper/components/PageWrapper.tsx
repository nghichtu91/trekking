import React from 'react'
import { Row, Col } from 'antd'

export const PageWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <Row className="page-wrapper" justify="center">
      <Col sm={24} xs={24} md={18} xl={20} xxl={10}>
        {children}
      </Col>
    </Row>
  )
}
