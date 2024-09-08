import getCurrentUser from "@/actions/getCurrentUser";
import Client from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {userId, isGroup, members, name} = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', {status: 400});
        }

        if (isGroup) {
            const newConversation = await Client.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: {value: string}) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            });

            return NextResponse.json(newConversation, {status: 200});
        }

        const existingConversations = await Client.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];
        if (singleConversation) {
            return NextResponse.json(singleConversation, {status: 200});
        }

        const newConversation = await Client.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        }, 
                        {
                           id: userId 
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        return NextResponse.json(newConversation, {status: 200});

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}