import { useContext } from 'react'
import { Typography, List, Row, Col, Button } from 'antd'
import { Context } from '@shared/infra/context/gobalContext'
import { useDispatch } from '@shared/infra/hooks/useDispatch'
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const Profile = () => {
  const { profile } = useContext(Context)
  const dispatch = useDispatch()

  return (
    <Row justify="center">
      <Button
        onClick={() =>
          dispatch({
            type: 'profile_update',
            payload: {
              fullName: 'Lê Nhật Thành',
              maill: 'nhatthanh5891@gmail.com',
            },
          })
        }
      >
        Test button
      </Button>
      <Col sm={24} md={15} xl={20} xxl={10}>
        <List
          header={
            <div>
              <Typography.Title level={4}> {profile.fullName} Brief </Typography.Title>
            </div>
          }
          footer={null}
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}

export default Profile
