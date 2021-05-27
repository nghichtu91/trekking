/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IForumOperations, withVerifyHandling } from '@modules/profile/hocs/withVerifyHandling'
import { Typography, Card, Form } from 'antd'
import { Trans } from 'next-i18next'
import { Verify } from '@modules/profile/components/Authentication'

const VerifyPage: React.FC<IForumOperations> = ({ handleVerify, handleReSendOtp, form }) => {
  return (
    <PageWrapper>
      <Card>
        <Form.Item>
          <Typography.Title className="text-center" level={3}>
            <Trans i18nKey="verifyOTP.title">Xác minh tài khoản</Trans>
          </Typography.Title>
          <Typography className="text-center">
            <Typography.Text className="block">
              <Trans i18nKey="authentication.verify.titleHeader">
                Chúng tôi có gửi một mã xác thực đến số điện thoại.
              </Trans>
            </Typography.Text>
            <Typography.Text className="block">
              <Trans i18nKey="authentication.verify.titleHeader">
                Vui lòng nhập để xác minh tài khoản
              </Trans>
            </Typography.Text>
          </Typography>
        </Form.Item>

        <Verify form={form} send={handleVerify} reSend={handleReSendOtp} />
      </Card>
    </PageWrapper>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withVerifyHandling(VerifyPage)
