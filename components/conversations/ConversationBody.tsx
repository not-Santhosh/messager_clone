'use client';

import React, { useRef, useState } from 'react';
import UseConversation from '@/hooks/UseConversation';
import { MessageType } from '@/type';
import { User } from '@prisma/client';
import MessageBox from '../MessageBox';

interface ConversationBodyProps {
  initialMessages: MessageType[]
}

const ConversationBody: React.FC<ConversationBodyProps> = ({initialMessages}) => {
  
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = UseConversation();

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-24'/>
    </div>
  )
}

export default ConversationBody
