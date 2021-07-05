import { Row, Col, Card, Button } from 'antd'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../../next-i18next.config'
import { ProductList } from '@modules/product/components'
import { useRouter } from 'next/router'
//
import { Products } from '@modules/product/faker/products'
// import { brands } from '@modules/product/faker/brands'
// import { categories } from '@modules/product/faker/categories'

// categoryFollowUrl
const IndexPage = () => {
  const router = useRouter()
  // const { categoryFollowUrl } = categories

  return (
    <Row justify="center">
      <Col xs={24} sm={24} xl={12}>
        <Card title="Danh mục xe ô tô" className="mb-8">
          {/* {Object.keys(categoryFollowUrl).map(item => (
            <p key={item['id']}> 1 </p>
          ))} */}
        </Card>

        <Card
          bordered={false}
          style={{ background: 'none' }}
          bodyStyle={{
            padding: '16px 0 0 0',
          }}
          headStyle={{
            background: '#fff',
          }}
          className="mb-8"
          title="Xe mới đăng bán"
        >
          <ProductList
            dataSource={Products}
            loadMore={
              <div className="text-center">
                <Button href={`${router.asPath}mua-ban-xe`} key="loadd">
                  Xem thêm 2000 sản phẩn
                </Button>
              </div>
            }
          />
        </Card>

        <Card className="mb-2" title="Tin tức xe và công nghệ"></Card>
      </Col>
    </Row>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], { i18n })),
  },
})

export default IndexPage
