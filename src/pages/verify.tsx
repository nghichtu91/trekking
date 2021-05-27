/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IForumOperations, withVerifyHandling } from '@modules/profile/hocs/withVerifyHandling'
import { Typography, Card, Form, Alert } from 'antd'
import { Trans } from 'next-i18next'
import { Verify } from '@modules/profile/components/Authentication'

const VerifyPage: React.FC<IForumOperations> = ({
  handleVerify,
  handleReSendOtp,
  form,
  errors = [],
}) => {
  const renderErrors = () => {
    return errors.map((error, index) => <Typography.Text key={index}>{error}</Typography.Text>)
  }

  return (
    <PageWrapper>
      <Card>
        <Form.Item>
          <Typography.Title className="text-center" level={3}>
            <Trans i18nKey="verifyOTP.title">Xác minh tài khoản</Trans>
          </Typography.Title>
          <Typography className="text-center">
            <Typography.Text className="block">
              <Trans values={{ email: 'example@gmail.com' }} i18nKey="verifyOTP.titleSub">
                Chúng tôi có gửi một mã xác thực đến số điện thoại.
              </Trans>
            </Typography.Text>
            <Typography.Text className="block">
              <Trans i18nKey="verifyOTP.plsEnterPin">Vui lòng nhập để xác minh tài khoản</Trans>
            </Typography.Text>
          </Typography>
        </Form.Item>
        <Form.Item hidden={errors.length === 0}>
          <Alert showIcon type="error" message={renderErrors()} />
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
