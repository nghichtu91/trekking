import { PageWrapper } from '@shared/components/wrapper'
import { VerifyTemplate } from '@modules/profile/components/verify'
import { Typography, Space } from 'antd'
import { MailFilled } from '@ant-design/icons'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const EmailVerify = () => {
  return (
    <PageWrapper>
      <VerifyTemplate
        title={
          <Space align="center" size={5}>
            <MailFilled className="align-baseline mr-1 text-xl text-red-400" />
            <Typography.Text>Xác thực email</Typography.Text>
          </Space>
        }
        type="email"
      />
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default EmailVerify
