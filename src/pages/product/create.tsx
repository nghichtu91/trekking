/**
 * @author ThanhLe
 * @version v0.0.1
 */
import { Row, Col } from 'antd'
import { OnboardTemplate } from '@modules/profile/components/onboarding/onboardTemplate'
import regStyles from '@assets/styles/reg.module.scss'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const App = () => {
  return (
    <Row justify="center" className={regStyles['authen--page']}>
      <Col xs={24} sm={24} xl={12}>
        <OnboardTemplate type="login" />
      </Col>
    </Row>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      // ...(await serverSideTranslations(locale)),
    },
  }
}

export default App
