import { Row, Col, Card, Button, List } from 'antd'
import { Products } from '@modules/product/faker/products'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../../next-i18next.config'
import { WrapperItemVertical } from '@modules/product/components/productItem'
import { useRouter } from 'next/router'

const App = () => {
  const router = useRouter()

  return (
    <Row justify="center">
      <Col xs={24} sm={24} xl={12}>
        <Card title="Danh mục xe ô tô" className="mb-8"></Card>
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
          <List
            grid={{ gutter: 8, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 }}
            dataSource={Products}
            loadMore={
              <div className="text-center">
                <Button href={`${router.asPath}mua-ban-xe/ds`} key="loadd">
                  Xem thêm 2000 sản phẩn
                </Button>
              </div>
            }
            rowKey="id"
            itemLayout="vertical"
            renderItem={item => (
              <List.Item>
                <Card bordered bodyStyle={{ padding: 0 }}>
                  <WrapperItemVertical
                    shortAttrs={item.shortAttrs}
                    item={item}
                    price={item.price}
                    productId={item['id']}
                    key={item['id']}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>

        <Card
          className="mb-2"
          title="Tin tức xe và công nghệ"
          actions={[
            <Button href={`${router.asPath}mua-ban-xe/ds`} type="link" key="loadd">
              Xem thêm
            </Button>,
          ]}
        ></Card>
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
