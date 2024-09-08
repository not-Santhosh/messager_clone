import getConversations from "@/actions/getConversation"
import ConversationList from "@/components/conversations/ConversationList"
import Sidebar from "@/components/sidebars/Sidebar"

export default async function ConversationsLayout ({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )
}