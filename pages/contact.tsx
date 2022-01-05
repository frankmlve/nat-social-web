import type { GetStaticPropsContext, NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslations } from 'next-intl';

const Contact: NextPage = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().min(50).required('Message is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const t = useTranslations('contact');



    async function onSubmit(data: any) {
        try {
            const res = await axios.post("/api/contact", data)
            console.log(res)
            //if sucess do whatever you like, i.e toast notification
            setTimeout(() => reset(), 2000);
        } catch (error) {
            // toast error message. whatever you wish 
        }
    }
    return (
        <SiteLayout pageTitle='Contact'>
            <section className='w-50'>
                <h1>{t('contact')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex w-50 flex-column m-auto'>
                    <label htmlFor='name' className='form-label'>{t('name')}</label>
                    <input
                        type='text'
                        {...register('name')}
                        id='name'
                        className='form-control mb-3' />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                    <label htmlFor='email'>{t('email')}</label>
                    <input
                        type='text'
                        {...register('email')}
                        id='email'
                        className='form-control mb-3' />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                    <label htmlFor='subject'>{t('subject')}</label>
                    <input
                        type='text'
                        {...register('subject')}
                        id='subject'
                        className='form-control mb-3' />
                    <div className="invalid-feedback">{errors.subject?.message}</div>
                    <label htmlFor='message'>{t('message')}</label>
                    <textarea
                        {...register('message')}
                        id='message'
                        className='form-control mb-3' />
                    <div className="invalid-feedback">{errors.message?.message}</div>
                    <button type='submit' className='btn btn-primary mt-3 w-25 align-self-end'>
                        {t('send')}
                    </button>
                </form>
            </section>
        </SiteLayout>
    )
}
export default Contact

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../i18n/${locale}.json`)).default
        }
    };
}