import {useFormStatus} from 'react-dom';

export default function SubmitButton({children, className = ''}){
    const {pending} = useFormStatus();
    return (
        <button type="submit" 
                disabled = {pending}
                className={"bg-blue-500 disabled:bg-blue-300 text-white disabled:text-gray-200 py-2 px-4 block mx-auto w-full gap-2 flex items-center justify-center" + className}>
            {pending && (
                <span>Saving.....</span>
            )}
            {!pending && children}
            
        </button>
    )
}