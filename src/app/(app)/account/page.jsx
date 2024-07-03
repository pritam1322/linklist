
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


export default async function AccountPage({searchParams, ...rest}){
    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername; 

    if(!session){
        redirect('/');
    }
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({owner:session?.user?.email})
    console.log(page);
    if(page){
        return (
            <PageSettingsForm page={page} user={session.user}/>
        );
    }
    return(
        <div>
            <UsernameForm desiredUsername={desiredUsername}/>
        </div>
    )
}