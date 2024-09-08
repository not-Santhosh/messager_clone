'use client';

import React, { useEffect, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string,
  register: UseFormRegister<FieldValues>,
  placeholder?: string,
  required?: boolean,
  errors?: FieldErrors,
  type?: string
};  

const MessageInput: React.FC<MessageInputProps> = ({id, type, register, placeholder, required, errors}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, {required: required})}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full 
        focus:outline-none"
      />
    </div>
  )
}

export default MessageInput;
