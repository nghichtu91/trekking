/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withLoginHandling, IForumOperations } from '@modules/profile/hocs/withLoginHandling'

const SignInPage: React.FC<IForumOperations> = props => {
  return (
    <PageWrapper>
      <p>sdsd</p>
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withLoginHandling(SignInPage)
