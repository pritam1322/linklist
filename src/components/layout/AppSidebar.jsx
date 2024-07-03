'use client'
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";


export default function AppSidebar(){
    const path = usePathname();
    return (
        <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-6  text-gray-700">
            <Link href={'/account'} 
                className={"flex gap-4 " + (path === '/account' ? 'text-blue-500 font-bold' : '' )}>
                <FontAwesomeIcon icon={faFileLines} className="w-6 h-6"/>
                <span className="">My Page</span>
            </Link>
            <Link href={'/analytics'} className={"flex gap-4 " + (path === '/analytics' ? 'text-blue-500 font-bold' : '' )}>
                <FontAwesomeIcon icon={faChartLine} className="w-6 h-6"/>
                <span className="">Analytics</span>
            </Link>
            <LogoutButton 
                className='flex gap-4 items-center' 
                iconLeft={true} 
                iconClasses="w-6 h-6"
            />
            <Link href={'/'} className="flex gap-2 items-center text-xs text-gray-600 border-t pt-4">
                <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3"/>
                <span>Back to website</span>
            </Link>
            </nav>
    );
}