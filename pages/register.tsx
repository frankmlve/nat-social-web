import { GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import SiteLayout from '../layouts/SiteLayout'
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const Register: NextPage = () => {

    const t = useTranslations('register');
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required(t('errors.username')),
        email: Yup.string()
            .required(t('errors.email'))
            .email(t('errors.invalidEmail')),
        password: Yup.string().min(8, t('errors.passLength')).required(t('errors.password')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('errors.confirmPassword'))
            .required(t('errors.confirmPassReq')),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data: any) {
        try {
            const res = await axios.post("/api/registerService", data)
            reset()
            //if sucess do whatever you like, i.e toast notification
        } catch (error) {
            // toast error message. whatever you wish 
            console.log(error)
        }
    }

    return (
        <SiteLayout pageTitle='Cursos'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column m-auto'>
                <div style={{ position: 'relative' }}>
                    <label htmlFor='name' className='form-label'>{t('username')}</label>
                    <input
                        type='text'
                        {...register('username')}
                        id='name'
                        className='form-control mb-3' />
                    {errors.name &&
                        <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.username?.message}</div>
                    }
                </div>
                <div style={{ position: 'relative' }}>
                    <label htmlFor='email'>{t('email')}</label>
                    <input
                        type='text'
                        {...register('email')}
                        id='email'
                        className='form-control mb-3' />
                    {errors.email &&
                        <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.email?.message}</div>
                    }
                </div>
                <div style={{ position: 'relative' }}>
                    <label htmlFor='password'>{t('password')}</label>
                    <input
                        type='password'
                        {...register('password')}
                        id='password'
                        className='form-control mb-3' />
                    {errors.password &&
                        <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.password?.message}</div>
                    }
                </div>
                <div style={{ position: 'relative' }}>
                    <label htmlFor='confirmPassword'>{t('password')}</label>
                    <input
                        type='password'
                        {...register('confirmPassword')}
                        id='confirmPassword'
                        className='form-control mb-3' />
                    {errors.confirmPassword &&
                        <div className="invalid-feedback form-error" style={{ display: 'flex' }}>{errors.confirmPassword?.message}</div>
                    }
                </div>
                <button type='submit' className='btn btn-primary mt-3 w-25 align-self-end'>
                    {t('send')}
                </button>
            </form>
        </SiteLayout>
    )
}

export default Register

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../i18n/${locale}.json`)).default
        }
    };
}