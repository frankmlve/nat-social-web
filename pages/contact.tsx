import type { GetStaticPropsContext, NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslations } from 'next-intl';

const Contact: NextPage = () => {

    const t = useTranslations('contact');
    const [emailSend, isEmailSend] = useState('none')
    const [emailResponse, setEmailResponse] = useState('')

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(t('errors.name')),
        email: Yup.string()
            .required(t('errors.email'))
            .email(t('errors.invalidEmail')),
        subject: Yup.string().required(t('errors.subject')),
        message: Yup.string().min(50, t('errors.messageLength')).required(t('errors.message'))
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data: any) {
        try {
            const res = await axios.post("/api/contact", data)
            setEmailResponse(res.data.message)
            isEmailSend('block')
            setTimeout(() => isEmailSend('none'), 2000);
            reset()
            //if sucess do whatever you like, i.e toast notification
        } catch (error) {
            // toast error message. whatever you wish 
            console.log(error)
        }
    }
    return (
        <SiteLayout pageTitle='Contact'>
            <section className='w-50'>
                <h1>{t('contact')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column m-auto'>
                    <label htmlFor='name' className='form-label'>{t('name')}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type='text'
                            {...register('name')}
                            id='name'
                            className='form-control mb-3' />
                        {errors.name &&
                            <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.name?.message}</div>
                        }
                    </div>
                    <label htmlFor='email'>{t('email')}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type='text'
                            {...register('email')}
                            id='email'
                            className='form-control mb-3' />
                        {errors.email &&
                            <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.email?.message}</div>
                        }
                    </div>
                    <label htmlFor='subject'>{t('subject')}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type='text'
                            {...register('subject')}
                            id='subject'
                            className='form-control mb-3' />
                        {errors.subject &&
                            <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.subject?.message}</div>
                        }
                    </div>
                    <label htmlFor='message'>{t('message')}</label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            {...register('message')}
                            id='message'
                            className='form-control mb-3' />
                        {errors.message &&
                            <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.message?.message}</div>
                        }
                    </div>
                    <button type='submit' className='btn btn-primary mt-3 w-25 align-self-end'>
                        {t('send')}
                    </button>
                </form>
            </section>
            <div className="position-fixed bottom-0 end-0 p-3">
                <div className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" style={{ display: emailSend }}>
                    <div className="d-flex">
                        <div className="toast-body">
                            {emailResponse}
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
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