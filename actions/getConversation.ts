import Client from "@/libs/prismaDb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async() => {
    const curremtUser = await getCurrentUser();

    if (!curremtUser?.id) {
        return [];
    }

    try {
        const conversations = await Client.conversation.findMany({
            where: {
                userIds: {
                    has: curremtUser.id
                }
            },
            orderBy: {
                lastMessageAt: 'desc'
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        return conversations;   
    } catch (error) {
        return [];
    }
}

export default getConversations;