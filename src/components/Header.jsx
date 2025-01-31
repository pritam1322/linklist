import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";

export default async function Header(){

    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <header className="bg-white  border-b py-4">
          <div className="max-w-4xl flex justify-between mx-auto px-6">
            <div className="flex items-center gap-6">
            <Link href={'/'} className="flex items-center gap-2 text-blue-700">
              <FontAwesomeIcon icon={faLink} className="text-blue-500"/>  
              <span className="font-bold">LinkList</span>
            </Link>
            <nav className="flex gap-4 text-gray-500 text-sm items-center">
              <Link href={'/about'}>About</Link>
              <Link href={'/pricing'}>Pricing</Link>
              <Link href={'/contact'}>Contact</Link>
            </nav>
          </div>
          
          <nav className="flex items-center text-gray-500 gap-6">
            {!session && (
            <>
              <Link href={'/login'}>Sign In</Link>
              <Link href={'/login'}>Create Account</Link>
            </>)
            }
            {!!session && (
            <>
              <Link href={'/account'}>
                Hello, {session?.user?.name}
              </Link>
              <LogoutButton/>
            </>
            )}
            
          </nav>
        </div>
      </header>
    )
}