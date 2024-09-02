import Sidebar from "@/components/sidebars/Sidebar";
import React from "react";

export default async function UsersLayout({children}: {children: React.ReactNode}) {
    return (
        <Sidebar>
            <div className="h-full">{children}</div>
        </Sidebar>
    );
}