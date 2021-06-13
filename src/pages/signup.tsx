/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { SignUp } from '@modules/profile/components/Authentication'
import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withExtraAuthen, IForumOperations } from '@modules/profile/hocs/withAuthenService'
import { Typography, Card, Col, Row } from 'antd'
import { Trans } from 'next-i18next'
import { i18n } from '../../next-i18next.config'

const SignUpAndSignInPage: React.FC<IForumOperations> = props => {
  return (
    <PageWrapper>
      <Row className="onboard-container" justify="center">
        <Col className="has--shadow" xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
          <Card bordered={false}>
            <Typography.Title className="text-center" level={3}>
              <Trans i18nKey="authentication.signUp.titleHeader">Đăng ký tài khoản</Trans>
            </Typography.Title>
            <SignUp
              onSignIn={props.handleSignIn}
              form={props.form}
              loading={props.formLoading}
              onSignUp={props.handleSignUp}
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], { i18n })),
  },
})

export default withExtraAuthen(SignUpAndSignInPage)
