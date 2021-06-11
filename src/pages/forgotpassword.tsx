/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  withForGotPasswordHandling,
  IForumOperations,
} from '@modules/profile/hocs/withForGotPasswordHandling'
import { ForGot } from '@modules/profile/components/Authentication'
import { Row, Col } from 'antd'

const ForGotPassworPage: React.FC<IForumOperations> = props => {
  const { handleGetOpt, handleResetPassword, goToSignInPage } = props
  return (
    <PageWrapper>
      <Row className="onboard-container" justify="center">
        <Col xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
          <ForGot
            isGetOtp={props.isGetOpt}
            goBack={goToSignInPage}
            handleGetOtp={handleGetOpt}
            handleUpdateNewPassword={handleResetPassword}
            form={props.form}
            loading={props.formLoading}
          />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withForGotPasswordHandling(ForGotPassworPage)
