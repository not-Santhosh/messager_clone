'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './custom_ui/Input';
import Button from './custom_ui/Button';
import AuthSocialButton from './custom_ui/AuthSocialButton';
import { BsFacebook, BsGithub, BsGoogle, BsInstagram } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push('/users');          
        }
    }, [session?.status]);

    const toggleVariants = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);

        if (variant === "REGISTER") {
            axios.post('/api/register', data)
            .then((response) => {
                signIn('credentials', data);
            })
            .catch((error) => {
                toast.error("Something went wrong...");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }

        if (variant === "LOGIN") {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid Credentials');
                }
        
                if (callback?.ok && !callback?.error) {
                    toast.success('Welcome back...');
                    router.push('/users');
                }
            })
            .finally(() => {
                setLoading(false);
            });
        }        
    }

    const socialAction = (action: string) => {
        setLoading(true);

        signIn(action, { redirect: false})
        .then((callback) => {
            if (callback?.error) {
                toast.error('Invalid Credentials');
            }
    
            if (callback?.ok && !callback?.error) {
                toast.success('Successfully logged in');
            }
        })
        .finally(() => setLoading(false));
    }
    
    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        <Input id="name" type='text' errors={errors} label='Name' register={register}/>
                    )}
                    <Input id="email" errors={errors} label='Email Address' disabled={loading} register={register}/>
                    <Input id="password" type='password' errors={errors} label='Password' disabled={loading} register={register}/>
                    <div>
                        <Button disabled={loading} fullWidth type="submit">
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className='bg-white px-2 text-gray-500'>Or Continue With</span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                        <AuthSocialButton icon={BsFacebook} onClick={() => socialAction('facebook')}/>
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div onClick={toggleVariants} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
