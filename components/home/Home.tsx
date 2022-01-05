import React, { FC } from 'react'
import { useRouter } from 'next/router'
import {useTranslations} from 'next-intl';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const t = useTranslations('home');
    return (
        <div>
            <h1>{t('hello')}</h1>
        </div>
    )
}
export default Home