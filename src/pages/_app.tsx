import 'antd/dist/antd.css'
import '../shared/layout/baseLayout.css'
import '@shared/components/button/styles/LoadMoreButton.css'
import awsExports from '../aws-exports'
import { useState, useEffect } from 'react'
import Amplify, { Hub, Auth } from 'aws-amplify'
import { BaseLayout } from '@shared/layout/baseLayout'
import type { AppProps /*, AppContext */ } from 'next/app'
import { appWithTranslation } from 'next-i18next'

Amplify.configure({ ...awsExports, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  const [signedInUser, setSignedInUser] = useState(false)
  useEffect(() => {
    authListener()
  })
  const authListener = async () => {
    Hub.listen('auth', data => {
      console.log(data)
      switch (data.payload.event) {
        case 'signIn':
          return setSignedInUser(true)
        case 'signOut':
          return setSignedInUser(false)
      }
    })
    try {
      const vv = await Auth.currentAuthenticatedUser()
      console.log(vv)
      setSignedInUser(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <BaseLayout isAuthenticated={signedInUser}>
      <Component {...pageProps} />
    </BaseLayout>
  )
}
export default appWithTranslation(MyApp)
