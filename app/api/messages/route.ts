import getCurrentUser from "@/actions/getCurrentUser";
import Client from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export const POST = async(req: Request) => {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {message, image, conversationId} = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        if (!message && !image) {
            return new NextResponse('Invalid data', {status: 400})
        }

        const newMessage = await Client.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        });

        const updatedConversation = await Client.conversation.update({
            where:{
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });

        return NextResponse.json(newMessage, {status: 200});
    } catch (error: any) {
        console.log(error, 'Error in Messages');
        return new NextResponse('Internal Error', {status: 500  });
    }
}