import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '@/styles/globals.css'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  // Pages that don't need the main layout
  const noLayoutPages = ['/login', '/register', '/404']
  
  if (noLayoutPages.includes(router.pathname)) {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}