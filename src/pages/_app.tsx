/**
 * @version v0.0.1
 * @author ThanhLe
 */

// #region  import global css
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import '@shared/layout/baseLayout.css'
import '@shared/components/button/styles/LoadMoreButton.css'
// #endregion
// #region  import package
import Router from 'next/router'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
//#endregion
// #region  import global
import { BaseLayout } from '@shared/layout/baseLayout'
import '@shared/infra/services/awsServices'
import nextI18NextConfig from '../../next-i18next.config.js'
import { ContextProvider } from '@shared/infra/context/gobalContext'
// import { UseAws } from '@modules/profile/hooks/useAuthe'

// #endregion

// listing router loading
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  // NProgress.start()
})
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Leo Núi lên đỉnh được là sướng</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ContextProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ContextProvider>
      <div id="popup"> </div>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
