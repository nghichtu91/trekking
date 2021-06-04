/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { SignIn } from '@modules/profile/components/Authentication'
import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withLoginHandling, IForumOperations } from '@modules/profile/hocs/withLoginHandling'

const SignInPage: React.FC<IForumOperations> = props => {
  return (
    <PageWrapper>
      <SignIn
        signUpHandle={props.goToSignUpPage}
        signInHandle={props.handleSignIn}
        signInWithGooogle={props.signInWithGooogle}
        signInWithFacebook={props.signInWithFacebook}
        form={props.form}
        loading={props.formLoading}
      />
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withLoginHandling(SignInPage)
