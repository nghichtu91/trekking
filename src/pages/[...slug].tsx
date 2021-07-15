/**
 * @author ThanhLe
 * @version v0.0.1
 */
import { Row, Col, Card, Carousel, Typography, Space, Avatar, Button } from 'antd'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../../next-i18next.config'
import { ProductList } from '@modules/product/components'
import { Products } from '@modules/product/faker/products'
import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import Link from 'next/link'
// import Slider from 'react-slick'
// #region components
import { Price } from '@modules/product/components'
// #endregion
import styles from '@assets/styles/slug.module.scss'

const DetailPage = () => {
  const settings = {
    dots: {
      className: 'slick-dots slick-thumb',
    },
    infinite: true,
    centerMode: true,
    centerPadding: '-1px',
    adaptiveHeight: true,
  }

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={15} lg={15} xl={13} xxl={13}>
        <Card className="mb-5">
          <Row justify="space-around">
            <Col xs={24} sm={24} md={12}>
              <div className={styles.imageWraper}>
                <Carousel {...settings}>
                  <div>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <img
                        alt=""
                        src="https://cdn.chotot.com/lHi5DOpXbdEyu47cvfExjenS0A3e8f6Iv-S1TVN1bE0/preset:view/plain/fa59bc5cf5fc3be1fe7f1fea4eadad63-2719301845888308990.jpg"
                      />
                    </Card>
                  </div>
                  <div>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <img
                        alt=""
                        src="https://cdn.chotot.com/lHi5DOpXbdEyu47cvfExjenS0A3e8f6Iv-S1TVN1bE0/preset:view/plain/fa59bc5cf5fc3be1fe7f1fea4eadad63-2719301845888308990.jpg"
                      />
                    </Card>
                  </div>
                </Carousel>
              </div>
            </Col>
            <Col xs={24} sm={24} md={10}>
              <Typography.Title className="product-title" level={4}>
                Bán oto Bán otoBán otoBán otoBán otoBán oto
              </Typography.Title>

              <Space direction="vertical">
                <div>
                  <Avatar icon={<UserOutlined />} size={20} />
                  <Link href="/">
                    <Button type="link">Thành Lê</Button>
                  </Link>
                </div>
                <Price value={5000000} />
                <div>
                  <Space size="middle">
                    <Button type="default">Đặt Hàng</Button>
                    <Button type="primary"> Liên hệ người bán </Button>
                  </Space>
                </div>
              </Space>
              {/* <Divider /> */}
            </Col>
          </Row>
        </Card>
        <Card className="mb-5" title="Thông tin kỹ thuật">
          <div className="mb-2">
            <p>
              Tôi đang cần bán xe Toyota Innova 2016 số sàn biển HN. xe tôi đi ít và giữ gìn cẩn
              thận cũng như bảo dưỡng định kỳ nên xe còn rất mới ạ. xe máy 2.0 nên đi rất khoẻ và
              rất an toàn vì đã được trang bị phanh ABS và hai túi khí an toàn. Tôi cũng lắp thêm
              màn hình cảm ứng, cam lùi ban đêm, dán kính chống nắng. Xe chính chủ tên tôi nên ai
              mua hoàn toàn yên tâm ạ. Vậy ai có nhu cầu mua thì liên hệ với tôi để biết thêm thông
              tin về xe nhé.
            </p>
          </div>
          <Row justify="space-around">
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>
                  <ShopOutlined /> Hãng
                </Typography.Text>
                : Toyota
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>
                  <ShopOutlined /> Dòng xe
                </Typography.Text>
                : Innova
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>
                  <ShopOutlined /> Năm sản xuất
                </Typography.Text>
                : 2016
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Số Km đã đi</Typography.Text>: 65000
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Tình trạng</Typography.Text>: Đã sử dụng
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Hộp số</Typography.Text>: Số sàn
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Nhiên liệu</Typography.Text>: Xăng
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Xuất xứ</Typography.Text>: Việt Nam
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Kiểu dáng</Typography.Text>: Minivan (MPV)
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Typography>
                <Typography.Text strong>Số chỗ</Typography.Text>: 8
              </Typography>
            </Col>
          </Row>
        </Card>
        <Card
          bordered={false}
          style={{ background: 'none' }}
          bodyStyle={{
            padding: '8px 0 0 0',
          }}
          headStyle={{
            background: '#fff',
          }}
          className="mb-8"
          title="Xe tương tự"
        >
          <ProductList
            grid={{ gutter: 8, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }}
            dataSource={Products}
          />
        </Card>
      </Col>
    </Row>
  )
}

export const getServerSideProps = async ({ locale, params }) => {
  console.log(params)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], { i18n })),
    },
  }
}

export default DetailPage
