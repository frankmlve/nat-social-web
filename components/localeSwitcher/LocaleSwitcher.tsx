import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'


export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales?.filter((locale) => locale !== activeLocale)
  const currentLocale = locales?.filter((locale) => locale === activeLocale)
  const [visible, isVisible] = useState('none')

  function toggle(_visible: string) {
    isVisible(_visible);
  }

  return (
    <div className='dropdown ' onPointerEnter={() => toggle('block')} onPointerLeave={() => toggle('none')}>
      <button className='text-uppercase btn btn-light dropdown-toggle'>{currentLocale}</button>
      <ul className='dropdown-menu' style={{ display: visible, minWidth: 'auto' }}>
        {otherLocales?.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            <li key={locale} style={{ listStyle: 'none' }}>
              <Link href={{ pathname, query }} as={asPath} locale={locale}>
                <a className='dropdown-item text-uppercase' onClick={() => toggle('none')}>{locale}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}