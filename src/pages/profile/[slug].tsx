import { useContext, useEffect } from 'react'
import { Typography, Row, Col, Collapse, Space, Form, Input, Button } from 'antd'
import { Context } from '@shared/infra/context/gobalContext'
import {
  BankOutlined,
  SafetyOutlined,
  ProfileOutlined,
  CameraOutlined,
  UserOutlined,
  MailOutlined,
  AimOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  LockOutlined,
} from '@ant-design/icons'
//#region nextjs
import Head from 'next/head'
//#endregion

// import { useDispatch } from '@shared/infra/hooks/useDispatch'

const Profile = () => {
  const { profile } = useContext(Context)
  // const dispatch = useDispatch()
  const { Panel } = Collapse
  const [profileGeneralForm] = Form.useForm()
  const [profileSecurityForm] = Form.useForm()

  console.log(profile)
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
  const callback = key => {
    console.log(key)
  }
  useEffect(() => {
    profileGeneralForm.setFieldsValue({
      fullName: profile.fullName,
      email: profile.email,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
    })
  }, [profile, profileGeneralForm])
  return (
    <Row justify="center">
      <Head>
        <title>{profile.fullName} - Trekking</title>
      </Head>
      <Col sm={24} xs={24} md={18} xl={20} xxl={10}>
        {/* <Card
          type="inner"
          title={
            <Space align="center" size={5}>
              <ProfileOutlined className="align-baseline mr-1 text-3xl text-red-400" />
              <Typography.Text strong>Thông tin cơ bản</Typography.Text>
            </Space>
          }
          extra={<a href="#">Chỉnh sửa</a>}
        >
          <Form
            className="text-center"
            layout="vertical"
            form={profileGeneralForm}
            initialValues={profile}
          >
            <Form.Item label="Họ  và tên" name="fullName">
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              // extra="We must make sure that your are a human."
              label="Số điện thoại"
              name="phoneNumber"
            >
              <Input prefix={<PhoneOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input prefix={<MailOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                suffix={<AimOutlined />}
              />
            </Form.Item>
            <Form.Item label="CMND/CCCD" name="peopleId">
              <Input suffix={<CameraOutlined />} placeholder="CMND/CCCD" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="reset">
                  Huỷ bỏ
                </Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card> */}

        <Collapse
          accordion
          expandIcon={null}
          defaultActiveKey={['profile-general']}
          onChange={callback}
        >
          <Panel
            showArrow={false}
            header={
              <Space align="center" size={5}>
                <ProfileOutlined className="align-baseline mr-1 text-3xl text-red-400" />
                <Typography.Text strong>Thông tin cơ bản</Typography.Text>
              </Space>
            }
            key="profile-general"
          >
            <Form
              className="text-center"
              layout="vertical"
              form={profileGeneralForm}
              initialValues={profile}
            >
              <Form.Item label="Họ  và tên" name="fullName">
                <Input prefix={<UserOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item
                // extra="We must make sure that your are a human."
                label="Số điện thoại"
                name="phoneNumber"
              >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input prefix={<MailOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                <Input
                  prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                  suffix={<AimOutlined />}
                />
              </Form.Item>
              <Form.Item label="CMND/CCCD" name="peopleId">
                <Input suffix={<CameraOutlined />} placeholder="CMND/CCCD" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="reset">
                    Huỷ bỏ
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Panel>
          <Panel
            showArrow={false}
            header={
              <Space align="center" size={5}>
                <SafetyOutlined className="align-baseline mr-1 text-3xl text-red-400" />
                <Typography.Text strong>Bảo mật</Typography.Text>
              </Space>
            }
            key="profile-security"
          >
            <Form layout="vertical" className="text-center" form={profileSecurityForm}>
              <Form.Item label="Mật khẩu hiện tại" name="profile-current-password">
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item label="Mật khẩu mới" name="profile-new-password">
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="reset">
                    Huỷ bỏ
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Panel>
          <Panel
            showArrow={false}
            header={
              <Space align="center" size={5}>
                <BankOutlined className="align-baseline mr-1 text-3xl text-red-400" />
                <Typography.Text strong>Ngân hàng</Typography.Text>
              </Space>
            }
            key="profile-banking"
          >
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  )
}

export default Profile
