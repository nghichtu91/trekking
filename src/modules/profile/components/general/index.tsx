import React, { useEffect, useRef } from 'react'
import { Typography, Space, Form, Input, Button, Card, Avatar, Upload, Badge, Alert } from 'antd'
import {
  ProfileOutlined,
  UserOutlined,
  MailOutlined,
  AimOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  SafetyCertificateFilled,
} from '@ant-design/icons'
import Helper from '@shared/utils/helper'
import { IUser } from '@modules/profile/models'
import { Rule } from 'antd/lib/form'
import { VietNamePhonePattern, NumberPattern } from '@shared/constants/patterns'
import { Trans, useTranslation } from 'next-i18next'

interface ProfileGeneralProps extends React.HTMLAttributes<HTMLElement> {
  profile: IUser
  onSubmit?: (ojb: unknown) => void
  isLoading?: boolean
  isUpdated?: boolean
  errors?: Record<string, unknown>[]
}

export interface ProfileFormProps extends Omit<IUser, ''> {
  fileUpload?: File
}

export const ProfileGeneral: React.FC<ProfileGeneralProps> = props => {
  const [profileGeneralForm] = Form.useForm<ProfileFormProps>()
  const avatarFile = useRef(null)
  const profile = props.profile
  const { t } = useTranslation()

  const errors: string[] = ['updateProfile.address']

  const fullNameRules: Rule[] = [
    {
      max: 25,
    },
    { required: true },
  ]

  const phoneRules: Rule[] = [
    {
      pattern: VietNamePhonePattern,
    },
    { required: true },
  ]

  const personIdRules: Rule[] = [{ max: 12 }, { pattern: NumberPattern }]

  useEffect(() => {
    profileGeneralForm.setFieldsValue({
      fullName: profile.fullName,
      email: profile.email,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
    })
  }, [profile, profileGeneralForm])

  const handleChange = async (file: unknown) => {
    if (!Helper.fileSizeValid(file['file'])) {
      console.log('File size not valid')
      return false
    }
    avatarFile.current = file['file']
  }

  const handleSubmit = (opts: ProfileFormProps) => {
    opts.fileUpload = avatarFile.current
    props.onSubmit(opts)
  }

  return (
    <Card
      title={
        <Space align="center" size={5}>
          <ProfileOutlined className="align-baseline mr-1 text-3xl text-red-400" />
          <Typography.Text>
            <Trans i18nKey="updateProfile.titleHeader">Cài đặt tài khoản chung</Trans>
          </Typography.Text>
        </Space>
      }
      className="mb-5"
    >
      <Form
        colon={false}
        layout="vertical"
        form={profileGeneralForm}
        initialValues={profile}
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Form.Item className="text-center">
          <Space direction="vertical">
            <Badge
              count={<SafetyCertificateFilled className="align-baseline text-base text-gray-400" />}
            >
              <Avatar src={profile.avatar} size={65} />
            </Badge>
            <Upload
              onChange={handleChange}
              fileList={[]}
              accept="image/png, image/jpeg"
              maxCount={1}
              listType="picture"
            >
              <Button type="ghost">
                <Trans i18nKey="updateProfile.textBtnChangeAvatar">Thay đổi</Trans>
              </Button>
            </Upload>
          </Space>
        </Form.Item>

        <Form.Item
          hasFeedback
          rules={fullNameRules}
          label={t('updateProfile.fullName')}
          name="fullName"
        >
          <Input
            placeholder="Nhập họ và tên"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          label={t('updateProfile.phone')}
          rules={phoneRules}
          name="phoneNumber"
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item
          hasFeedback
          // label={<Trans i18nKey="updateProfile.email">Email</Trans>}
          label={t('updateProfile.email')}
          name="email"
        >
          <Input disabled prefix={<MailOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={personIdRules}
          label={t('updateProfile.personId')}
          name="personId"
        >
          <Input />
        </Form.Item>
        <Form.Item label={t('updateProfile.address')} name="address">
          <Input
            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
            suffix={<AimOutlined />}
          />
        </Form.Item>

        <Form.Item hidden={!props.isUpdated}>
          <Alert type="success" showIcon message="Bạn đã cập nhật thông tin thành công."></Alert>
          <Alert type="error" showIcon message="Có lỗi xảy ra."></Alert>
        </Form.Item>

        <Form.Item hidden={errors.length === 0}>
          <Alert type="error" showIcon message="Có lỗi xảy ra."></Alert>
        </Form.Item>

        <Form.Item className="text-center mb-0">
          <Space>
            <Button htmlType="reset">
              <Trans i18nKey="updateProfile.textBtnCancel">Huỷ bỏ</Trans>
            </Button>
            <Button loading={props.isLoading} type="primary" htmlType="submit">
              <Trans i18nKey="updateProfile.textBtnUpdate">Cập nhật</Trans>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
