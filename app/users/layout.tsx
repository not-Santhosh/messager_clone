import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebars/Sidebar";
import UserList from "@/components/users/UserList";
import React from "react";

export default async function UsersLayout({children}: {children: React.ReactNode}) {
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    );
}