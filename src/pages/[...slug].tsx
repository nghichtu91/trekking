/**
 * @author ThanhLe
 * @version v0.0.1
 */
import { Row, Col } from 'antd'
import regStyles from '@assets/styles/reg.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../../next-i18next.config'

const DetailPage = () => {
  return (
    <Row justify="center" className={regStyles['authen--page']}>
      <Col xs={24} sm={24} xl={12}>
        hallo
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
