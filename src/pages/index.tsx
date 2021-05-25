import { List, Row, Col } from 'antd'
import { Products } from '@modules/product/faker/products'
import { ProductItem } from '@modules/product/components/productItem'
import { LoadMoreButton } from '@shared/components/button'

const App = () => {
  // const router = useRouter();
  // const { locale, locales, defaultLocale } = router;
  // console.log(locale, locales, defaultLocale )
  return (
    <Row justify="center">
      <Col xs={24} sm={24} xl={12}>
        <List
          loadMore={<LoadMoreButton />}
          itemLayout="vertical"
          dataSource={Products}
          renderItem={item => <ProductItem item={item} />}
        />
      </Col>
    </Row>
  )
}

export default App
