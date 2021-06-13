/**
 * @author ThanhLe
 * @version v0.0.1
 */

import { PageWrapper } from '@shared/components/wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IForumOperations, withVerifyHandling } from '@modules/profile/hocs/withVerifyHandling'
import { Typography, Card, Form, Alert, Col, Row } from 'antd'
import { Trans } from 'next-i18next'
import { Verify } from '@modules/profile/components/Authentication'

const VerifyPage: React.FC<IForumOperations> = ({
  handleVerify,
  handleReSendOtp,
  form,
  errors = [],
  loading = false,
}) => {
  const renderErrors = () => {
    return errors.map((error, index) => <Typography.Text key={index}>{error}</Typography.Text>)
  }

  return (
    <PageWrapper>
      <Row className="onboard-container" justify="center">
        <Col className="has--shadow" xxl={15} xl={15} lg={18} md={18} xs={24} sm={24}>
          <Card bordered={false}>
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
              </Typography>
            </Form.Item>
            <Form.Item hidden={errors.length === 0}>
              <Alert showIcon type="error" message={renderErrors()} />
            </Form.Item>
            <Verify loading={loading} form={form} send={handleVerify} reSend={handleReSendOtp} />
          </Card>
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

export default withVerifyHandling(VerifyPage)
