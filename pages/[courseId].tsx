import { GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import SiteLayout from '../layouts/SiteLayout'


const Course = ({string: id}) => { 

    return (
        <SiteLayout pageTitle='Cursos'>
            <h1>Cursos {id}</h1>
        </SiteLayout>
    )
}

export default Course

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../i18n/${locale}.json`)).default
        }
    };
}