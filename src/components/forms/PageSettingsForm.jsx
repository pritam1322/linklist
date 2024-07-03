"use client";
import { savePageSettings } from "@/actions/pageActions";
import { faCamera, faCloudArrowUp, faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import RadioTogglers from "../formItems/radioTogglers";

export default function PageSettingsForm({page, user}){

    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, setBgColor] = useState(page.bgColor);
    const [bgImage, setBgImage] = useState(page.bgImage);
    const [avatar, setAvatar] = useState(user?.image);

    async function saveBaseSettins(formData){
        
        const result = await savePageSettings(formData);
        console.log('displayname', page.displayName);
        if(result){
            toast.success('Saved!');
        }
        
        // const promise = new Promise(async (resolve, reject) => {
        //     const result = await savePageSettings(formData);
        //     if(result){
        //         resolve();
        //     }else reject();
        // });
        // toast.promise( promise, {
        //     success: 'Saved!',
        //     loading: 'Saving.....',
        //     error: 'Saving failed'
        // })
        
    }  

    async function upload(ev, callbackFn){
        const file = ev.target.files?.[0];
        
        if(file){

            const uploadPromise = new Promise((resolve, reject) => {
                const data = new FormData();
                data.set('file', file);
                fetch('/api/upload', {
                    method: 'POST',
                    body:  data
                }).then(response => {
                    if(response.ok){
                        response.json().then(link =>{
                            callbackFn(link);
                            resolve();
                        });
                    }else{
                        reject();
                    }
                });
            });
            
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Image uploaded!',
                error: 'Image upload failed'
            })

        }
    }
    
    async function handleCoverImageChange(ev){
        await upload(ev, link => {
            setBgImage(link);
        })
    }

    async function handleAvatarImageChange(ev){
        await upload(ev, link => {
            setAvatar(link);
        })
    }

    return (
        <div className="-m-4">
            <form action={saveBaseSettins}>
                <div className="bg-gray-300 min-h-[300px] py-4 flex flex-col justify-center items-center bg-cover bg-center"
                     style={
                        bgType === 'color' ? {backgroundColor: bgColor} : {backgroundImage: `url(${bgImage})`}
                     }
                >
                    <RadioTogglers 
                        defaultValue = {page.bgType}
                        options={[
                            {value:'color' , icon:faPalette, label: 'Color'},
                            {value:'image' , icon:faImage, label: 'Image'}
                        ]} 
                        onChange={val => setBgType(val)}
                    /> 
                    
                    {bgType === 'color' && (
                        <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                            <div className="flex justify-center ">
                                <span>Background color:</span>
                                <input 
                                    type="color" 
                                    name="bgColor" 
                                    onChange={ev => setBgColor(ev.target.value)}
                                    defaultValue={bgColor}/> 
                            </div> 
                        </div>
                    )}

                    {bgType === 'image' && (
                        <div className="flex justify-center">
                            
                            <label
                                className="bg-white shadow px-4 py-2 mt-2 flex gap-2 items-center"
                            >
                                <input type="hidden" name="bgImage" value={bgImage} />
                                <input 
                                    type="file" 
                                    onChange={handleCoverImageChange}
                                    className="hidden"
                                />
                                <FontAwesomeIcon icon={faCloudArrowUp} className="h-4 text-gray-700"/>
                                <span>Change image</span>
                            </label> 

                        </div> 
                    )}

                    
                    
                                 
                </div>
                <div className="flex justify-center -mb-12">
                    <div className="relative -top-8 w-[128px] h-[128px]">
                        <div className="overflow-hidden rounded-full border-4 border-white shadow shadow-black/50 h-full">
                            <Image 
                                className="w-full h-full object-cover" 
                                src={avatar} 
                                alt="avatar" 
                                width={128} 
                                height={128}/>
                        </div>
                        <label htmlFor="avatarIn"
                            className="absolute -bottom-0 -right-2 p-2 rounded-full shadow shadow-black/75
                            items-center aspect-square bg-white  cursor-pointer">
                            <FontAwesomeIcon icon={faCloudArrowUp} size={'xl'} className=""/>
                        </label>
                        <input onChange={handleAvatarImageChange} type="file" id="avatarIn" className="hidden" />
                        <input type="hidden" name="avatar" value={avatar} />
                    </div>
                </div>
                <div className="p-4 ">
                    <label 
                        className="input-label" 
                        htmlFor="nameIn" >
                        Display Name
                    </label>
                    <input 
                        type="text" 
                        id="nameIn" 
                        name="displayName"
                        defaultValue={page.displayName} 
                        placeholder="John Deo" />
                    <label 
                        className="input-label" 
                        htmlFor="locationIn" >
                        Location
                    </label>
                    <input 
                        type="text" 
                        id="locationIn" 
                        name="location"
                        defaultValue={page.location} 
                        placeholder="Somewhere in the world" />
                    <label 
                        className="input-label" 
                        htmlFor="bioIn">
                        Bio
                    </label>
                    <textarea 
                        name="bio"
                        defaultValue={page.bio} 
                        id="bioIn" 
                        placeholder="You bio goes here" />
                </div>
                <div className="max-w-[200px] mx-auto mb-4">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}