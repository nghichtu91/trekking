import { Typography, List } from 'antd'
import { withAuthenticator } from '@aws-amplify/ui-react'
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const App = () => {
  return (
    <List
      header={
        <div>
          <Typography.Title level={4}> Thanhffs Brief </Typography.Title>
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
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      todos: [],
    },
  }
}

export default withAuthenticator(App)
