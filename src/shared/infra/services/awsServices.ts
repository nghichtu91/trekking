import Amplify, { I18n } from 'aws-amplify'
import awsExports from '../../../aws-exports'
Amplify.configure({ ...awsExports, ssr: true })
I18n.setLanguage('vi')
