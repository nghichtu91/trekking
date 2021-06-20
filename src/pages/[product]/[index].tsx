/**
 * @author ThanhLe
 * @version v0.0.1
 */
import { Row, Col, List } from 'antd'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PageWrapper } from '@shared/components/wrapper'
import { ProductFilters } from '@modules/product/components/filters'
import { Products } from '@modules/product/faker/products'
import { WrapperItem } from '@modules/product/components/productItem'
import { LoadMoreButton } from '@shared/components/button'

const ProductsPage = () => {
  return (
    <PageWrapper>
      <ProductFilters />
      <Row>
        <Col xxl={17} xl={17} lg={20} md={20} xs={24} sm={24}>
          <List
            loadMore={<LoadMoreButton />}
            itemLayout="vertical"
            dataSource={Products}
            renderItem={item => <WrapperItem item={item} />}
          />
        </Col>
        <Col xxl={7} xl={7} lg={4} md={4} xs={0} sm={0}>
          2
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ProductsPage
