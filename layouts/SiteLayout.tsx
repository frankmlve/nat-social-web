import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { appWithTranslation } from 'next-i18next'
import { GetStaticPropsContext } from 'next'

interface LayoutProps {
  pageTitle: string
}

const SiteLayout: React.FC<LayoutProps> = ({pageTitle, children}) => {
  return (
    <div>
      <Head>
        <title>Nat Social | {pageTitle}</title>
      </Head>
      <div>
        <main className='main'>
          <Header classes="d-flex"/>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
export default SiteLayout

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  };
}