import { GetStaticPropsContext } from 'next';
import type { ReactElement } from 'react'
import Home from '../components/home/Home'
import SiteLayout from '../layouts/SiteLayout'

export default function Page() {
  return (
    <SiteLayout pageTitle="Home">
      <Home />
    </SiteLayout>
  )
}
export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  };
}
