/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { SignUp } from '@modules/profile/components/Authentication'
import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withExtraAuthen, IForumOperations } from '@modules/profile/hocs/withAuthenService'
import { Typography, Card } from 'antd'
import { Trans } from 'next-i18next'

const SignUpAndSignInPage: React.FC<IForumOperations> = props => {
  return (
    <PageWrapper>
      <Card>
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
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withExtraAuthen(SignUpAndSignInPage)
