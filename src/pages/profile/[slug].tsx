import { useContext } from 'react'
import { ProfileGeneral } from '@modules/profile/components/general'
import { withExtraInfo } from '@modules/profile/hocs/withProfileService'
import { IForumOperations } from '@modules/profile/hocs/withProfileService'
import { Context } from '@shared/infra/context/gobalContext'
import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

type ProfilePageProps = IForumOperations

const Profile: React.FC<ProfilePageProps> = props => {
  const { profile } = useContext(Context)
  return (
    <PageWrapper>
      <Head>
        <title>{profile.fullName} </title>
      </Head>
      <ProfileGeneral
        isLoading={props.formLoading}
        onSubmit={props.updateProfile}
        profile={profile}
      />
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withExtraInfo(Profile)
