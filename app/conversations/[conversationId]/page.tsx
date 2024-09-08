import getConversationById from '@/actions/getConversationById';
import getMessages from '@/actions/getMessages';
import ConversationBody from '@/components/conversations/ConversationBody';
import Footer from '@/components/conversations/Footer';
import Header from '@/components/conversations/Header';
import EmptyState from '@/components/EmptyState';
import React from 'react'

interface Iparams {
    conversationId: string;
}

const page = async({params}: {params: Iparams}) => {
    
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className='lg:pl-80 h-full'>
                <div className='h-full flex flex-col'>
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
                <Header conversation={conversation}/>
                <ConversationBody initialMessages={messages}/>
                <Footer />
            </div>
        </div>
    )
}

export default page
