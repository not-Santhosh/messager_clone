import Client from "@/libs/prismaDb";
import { getSession } from "./getSession";

const getUsers = async() => {
    const session = await getSession();
    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await Client.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return users;
    } catch (error: any) {
        return [];
    }
}

export default getUsers;