import { Row, Col } from 'antd'
import { Products } from '@modules/product/faker/products'
// import { WrapperItem } from '@modules/product/components/productItem'
// import { LoadMoreButton } from '@shared/components/button'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../../next-i18next.config'
import { ProductList } from '@modules/product/components/ListProduct'

const App = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={24} xl={12}>
        <ProductList dataSource={Products} />
        {/* <List
          loadMore={<LoadMoreButton />}
          itemLayout="vertical"
          dataSource={Products}
          renderItem={item => <WrapperItem key={item.id} productId={item.id} item={item} />}
        /> */}
      </Col>
    </Row>
  )
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], { i18n })),
  },
})
export default App
