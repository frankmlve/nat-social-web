import Link, { LinkProps } from 'next/link'
import React, { FC } from 'react'

interface AppLinkProps extends LinkProps {
    label: string,
    styles: string
}
const AppLink: FC<AppLinkProps> = ({href, label, styles}) => {
    return (
        <Link href={href}>
            <a className={styles}>{label}</a>
        </Link>
    )
}
export default AppLink