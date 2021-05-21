/**
 * @author ThanhLe
 * @version v0.0.1
 */
import { Row, Col } from 'antd'
import { OnboardTemplate } from '@modules/profile/components/onboarding/onboardTemplate'
import regStyles from '@assets/styles/reg.module.scss'

const App = () => {
  return (
    <Row justify="center" className={regStyles['authen--page']}>
      <Col xs={24} sm={24} xl={12}>
        <OnboardTemplate type="login" />
      </Col>
    </Row>
  )
}

export default App
