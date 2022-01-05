import React, { FC } from 'react'

interface FooterProps{

}
const Footer: FC<FooterProps> = () => {
    return (
        <footer className='footer'>
            <p>&copy; Serendepia</p>
        </footer>
    )
}
export default Footer