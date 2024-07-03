'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {signIn} from "next-auth/react";

export default function LoginWithGoogle(){
    
    
    
    return(
        <button onClick={() => signIn('google')} className="bg-white shadow text-center w-full py-4 flex gap-3 justify-center">
            <FontAwesomeIcon icon={faGoogle} className="h-7"/>
            Sign In with Google
        </button>
    )
}