/**
 * @author ThanhLe
 * @version v0.0.1
 */
import React from 'react'
import { Row, Col } from 'antd'
import { PageWrapper } from '@shared/components/wrapper'
import { ProductFilters } from '@modules/product/components/filters'
import { ProductList } from '@modules/product/components/ListProduct'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../../../next-i18next.config'
import { Products } from '@modules/product/faker/products'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import {
  withProductService,
  IWithProductServiceProps,
} from '@modules/product/hocs/withProductService'

const ProductsPage: React.FC<IWithProductServiceProps> = props => {
  const { handleChangePage } = props
  const router = useRouter()
  const { query } = router
  const pageQuery = query['paged'] as string
  const paged = query?.paged ? parseInt(pageQuery) : 1

  return (
    <PageWrapper>
      <ProductFilters />
      <Row>
        <Col xxl={17} xl={17} lg={20} md={20} xs={24} sm={24}>
          <ProductList
            layout="vertical"
            total={50}
            paged={paged}
            dataSource={Products}
            onChangePagination={handleChangePage}
          />
        </Col>
        <Col xxl={7} xl={7} lg={4} md={4} xs={0} sm={0}>
          2
        </Col>
      </Row>
    </PageWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], { i18n })),
    },
  }
}

export default withProductService(ProductsPage)
