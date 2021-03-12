import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import '@shared/layout/baseLayout.css'
import '@shared/components/button/styles/LoadMoreButton.css'
import Router from 'next/router'
import Head from 'next/head'
// import awsExports from '../aws-exports'
import { useState, useEffect } from 'react'
import { Hub, Auth } from 'aws-amplify'
import { BaseLayout } from '@shared/layout/baseLayout'
import type { AppProps /*, AppContext */ } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '@shared/infra/services/awsServices'
import nextI18NextConfig from '../../next-i18next.config.js'
import { ContextProvider } from '@shared/infra/context/gobalContext'
// import { UseAws } from '@modules/profile/hooks/useAuthe'
//

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  // NProgress.start()
})
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  const [signedInUser, setSignedInUser] = useState(false)
  // UseAws()
  useEffect(() => {
    authListener()
  })
  const authListener = async () => {
    Hub.listen('auth', data => {
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
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Head>
        <title>Leo Núi lên đỉnh được là sướng</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ContextProvider>
        <BaseLayout isAuthenticated={signedInUser}>
          <Component {...pageProps} />
        </BaseLayout>
      </ContextProvider>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
