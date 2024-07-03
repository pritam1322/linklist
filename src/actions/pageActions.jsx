'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData){
    mongoose.connect(process.env.MONGO_URI);
    console.log(formData.get('location'));
    const session = await getServerSession(authOptions);
    if(session){
        const dataKeys = ['displayName', 'location', 'bio', 'bgType', 'bgColor', 'bgImage', 'avatar'];

        const dataToUpdate = {};
        for(const key of dataKeys){
            
            if(formData.has(key)){
                dataToUpdate[key] = formData.get(key);
            }
        }

        // const displayName = formData.get('displayName');
        // const location = formData.get('location');
        // const bio = formData.get('bio');
        // const bgType = formData.get('bgType');
        // const bgColor = formData.get('bgColor');
        // const bgImage = formData.get('bgImage');

        // const dataToUpdate = {
        //     displayName, location, bio, bgType
        // }

        // if(bgColor) dataToUpdate.bgColor = bgColor;
        // if(bgImage) dataToUpdate.bgImage = bgImage;
        console.log(dataToUpdate);
        await Page.updateOne(
            {owner:session?.user?.email}, 
            dataToUpdate
        );

        if(formData.has('avatar')){
            const avatarLink = formData.get('avatar');
            await User.updateOne({email: session?.user?.email}, {image: avatarLink})
        }
        return true;
    }
    return false;
}