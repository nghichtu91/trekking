import {
  ProfileOutlined,
  SettingOutlined,
  ContainerOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Routers } from './routers'

export interface IProfileMenus {
  key: string
  title?: string | React.ReactNode
  uri?: string
  icon?: string | React.ReactNode
  i18nKey?: string
  className?: string
}

export const ProfileMenus: IProfileMenus[] = [
  {
    key: 'popover-profile--menu-profile',
    icon: <ProfileOutlined className="align-text-top" />,
    uri: Routers.ProfilePage,
    title: 'Thông tin tài khoản',
  },
  {
    key: 'popover-profile--menu-post',
    icon: <ContainerOutlined className="align-text-top" />,
    uri: '#',
    title: 'Danh sách ký gửi',
  },
  {
    key: 'popover-profile--menu-order',
    icon: <HistoryOutlined className="align-text-top" />,
    uri: '#',
    title: 'Lịch sử giao dịch',
  },
  {
    key: 'popover-profile--menu-settings',
    icon: <SettingOutlined className="align-text-top" />,
    uri: '#',
    title: 'Cài đặt',
  },
  {
    key: 'popover-profile--menu-support',
    icon: <QuestionCircleOutlined className="align-text-top" />,
    uri: '#',
    title: 'Hỗ trợ',
  },
]

export const MainMenus: IProfileMenus[] = [
  {
    key: 'main--menu-home',
    // icon: <ProfileOutlined className="align-text-top" />,
    uri: Routers.HomePage,
    title: 'Trang chủ',
  },
  {
    key: 'main--menu-sell',
    // icon: <ContainerOutlined className="align-text-top" />,
    uri: Routers.SellPage,
    title: 'Mua',
  },
]
