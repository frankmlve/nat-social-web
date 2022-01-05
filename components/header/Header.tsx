import Link from 'next/link'
import React, { FC } from 'react'
import AppLink from '../AppLink'
import LocaleSwitcher from '../localeSwitcher/LocaleSwitcher'
import { useTranslations } from 'next-intl';

interface HeaderProps {
    classes: string
}

const Header: FC<HeaderProps> = ({ classes }) => {
    const t = useTranslations('header');

    return (
        <header className='header border'>
            <div style={{ height: 120 }} className={'d-flex justify-content-between align-items-center'}>
                <nav className='navbar '>
                    <div className='container-fluid'>
                        <ul className='navbar-nav flex-row'>
                            <li className='nav-item'>
                                <AppLink href="/" label={t('home')} styles={'navbar-brand'} />
                            </li>
                            <li className='nav-item'>
                                <AppLink href="/contact" label={t('contact')} styles={'navbar-brand'} />
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='h-100 align-items-center d-flex  position-relative me-5' style={{ width: 50 }}>
                    <LocaleSwitcher />
                </div>
            </div>
        </header>
    )
}
export default Header