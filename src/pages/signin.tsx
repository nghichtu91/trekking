/**
 * @author ThanhLe
 * @version v0.0.1
 */
import { useState } from 'react'
import { SignIn, ForGot } from '@modules/profile/components/Authentication'
import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withLoginHandling, IForumOperations } from '@modules/profile/hocs/withLoginHandling'
import { Row, Col } from 'antd'

const SignInPage: React.FC<IForumOperations> = props => {
  const [isForGot, setIsForGot] = useState<boolean>(false)

  const handleForgot = () => {
    setIsForGot(!isForGot)
  }

  return (
    <PageWrapper>
      <Row className="onboard-container" justify="center">
        <Col xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
          <SignIn
            hidden={isForGot}
            signUpHandle={props.goToSignUpPage}
            signInHandle={props.handleSignIn}
            signInWithGooogle={props.signInWithGooogle}
            signInWithFacebook={props.signInWithFacebook}
            form={props.form}
            loading={props.formLoading}
            errors={props.errors}
            forgotPassword={handleForgot}
          />
          <ForGot hidden={!isForGot} goBack={handleForgot} />
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

export default withLoginHandling(SignInPage)
