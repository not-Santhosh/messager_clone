'use client';

import UseConversation from "@/hooks/UseConversation";
import useRoutes from "@/hooks/useRoutes";
import Mobileitem from "./Mobileitem";

const MobileFooter = () => {

    const routes = useRoutes();
    const {isOpen} = UseConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed flex w-full justify-between bottom-0 z-40 items-center
            bg-white border-t-[1px] lg:hidden"
        >
            {routes.map((route) => (
                <Mobileitem 
                    key={route.label}
                    href={route.href}
                    label={route.label}
                    icon={route.icon}
                    active={route.active}
                    onClick={route.onClick}
                />
            ))}
        </div>
    )
}

export default MobileFooter
