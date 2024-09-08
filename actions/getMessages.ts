import Client from "@/libs/prismaDb";

const getMessages = async(
    conversationId: string
) => {
    try {
        const messages = await Client.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return messages;
    } catch (error: any) {
        return [];
    }
}

export default getMessages;