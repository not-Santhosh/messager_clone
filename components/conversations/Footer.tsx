'use client';

import UseConversation from '@/hooks/UseConversation';
import axios from 'axios';
import React from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from '../MessageInput';
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';

const Footer = () => {

    const {conversationId} = UseConversation();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {shouldValidate: true});
        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        });
    }

    return (
        <div className='border-t-2    py-4 px-4 bg-white flex items-center gap-2 lg:gap-4 w-full'>
            <CldUploadButton
                options={{maxFiles: 1}}
                uploadPreset="fokajcfq"
                onSuccess={handleUpload}
            >
                <HiPhoto size={30} className='text-sky-500'/>
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput 
                    id="message"
                    type='text'
                    register={register}
                    errors={errors}
                    required
                    placeholder="Enter a message"
                />
                <button type='submit' className='rounded-full p-2 bg-sky-600 cursor-pointer transition'>
                    <HiPaperAirplane size={18} className='text-white'/>
                </button>
            </form>
        </div>
    )
}

export default Footer
