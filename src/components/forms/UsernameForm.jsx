'use client';
import grabUsername from "@/actions/grabUsername";
import RightIcon from "@/components/icons/RightIcon";
import { redirect } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";

export default function UsernameForm({desiredUsername}){
    const [taken, setTaken] = useState(false);
    async function handleSubmit(formData) {
        const result = await grabUsername(formData);
        setTaken(result === false);
        if(result){
            redirect('/account?created='+formData.get('username'));
        }
    }
    return(
        <form action={handleSubmit}>
            <h1 className="text-4xl font-bold text-center mb-2">
                Grab your username
            </h1>
            <p className="text-center mb-6 text-gray-500">
                Choose your username
            </p>
            <div className="max-w-xs mx-auto">
                <input className="block p-2 mx-auto border w-full mb-2 text-center" 
                    type="text" placeholder="username" name = "username"
                    defaultValue={desiredUsername}/>
                {taken && (
                    <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
                        This username is taken
                    </div>
                )}
                <SubmitButton>
                    <span>
                        Claim your username
                    </span>
                    <RightIcon/>
                </SubmitButton>
            </div>
        </form>
    )
}