'use client';
import Link from "next/link";
import clsx from "clsx";


interface MonbileitemProps {
    label: string,
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void
}

const Mobileitem: React.FC<MonbileitemProps> = ({label, href, icon:Icon, active, onClick}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <Link
            onClick={handleClick}
            href={href}
            className={clsx(`
                group flex gap-x-3 rounded-md w-full justify-center p-4 text-sm leading-6 font-semibold
                text-gray-500 hover:text-black hover:bg-gray-100
            `, active && 'bg-gray-100 text-black')}
        >
            <Icon className="h-6 w-6"/>
        </Link>
    )
}

export default Mobileitem
