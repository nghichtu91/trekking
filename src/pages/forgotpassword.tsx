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
  const { handleGetOpt, handleResetPassword, hendleResendOpt, errors } = props
  return (
    <PageWrapper>
      <Row className="onboard-container" justify="center">
        <Col className="has--shadow" xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
          <ForGot
            isGetOtp={props.isGetOpt}
            handleGetOtp={handleGetOpt}
            handleUpdateNewPassword={handleResetPassword}
            hendleResendOpt={hendleResendOpt}
            form={props.form}
            loading={props.formLoading}
            errors={errors}
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
