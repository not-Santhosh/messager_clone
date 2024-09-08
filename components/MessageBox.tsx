'use client';

import { MessageType } from '@/type';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React from 'react';
import Avatar from './Avatar';
import { format } from 'date-fns';
import Image from 'next/image';

interface MessageBoxProps {
    data: MessageType,
    isLast?: boolean
}
const MessageBox: React.FC<MessageBoxProps> = ({data, isLast}) => {

    const session = useSession();
    const isOwn = session.data?.user?.email === data.sender.email;

    const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ');

    const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

    const avatar = clsx(isOwn && "order-2");

    const body = clsx("flex flex-col gap-2" && isOwn && "items-end");

    const message = clsx("text-sm w-fit overflow-hidden rounded-md",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100"
    )

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender}/>
            </div>
            <div className={body}>
                <div className={message}>
                    {data.image ? (
                        <div className='border-red-300 '>
                            <Image 
                                alt="image"
                                src={data.image}
                                height="288"
                                width="288"
                                className='object-cover cursor-pointer hover:scale-110 transition 
                                translate p-0 border border-gray-400'
                            />
                            <span className='text-[10px] py-1 px-2 flex justify-end'>
                                {format(new Date(data.createdAt), 'p')}
                            </span>
                        </div>
                        ): (
                        <>
                            <div className='flex gap-2 justify-between py-1 px-3'>
                                {data.body}
                                <span className="text-[10px] pt-3">
                                    {format(new Date(data.createdAt), 'p')}
                                </span>
                            </div> 
                        </>
                    )}                    
                </div>
            </div>
           
        </div>
    )
}

export default MessageBox
