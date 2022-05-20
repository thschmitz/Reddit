import { useSession } from 'next-auth/react'
import React from 'react'
import Avatar from "./Avatar"
import {LinkIcon, PhotographIcon} from "@heroicons/react/outline"
import {useForm} from "react-hook-form"

type FormData= {
    postTitle: string,
    postBody: string,
    postImage: string,
    subreddit: string,
}

const PostBox = () => {
    const {data:session} = useSession();
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<FormData>()


    return (
        <form className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2">
            <div className="flex items-center space-x-3">
                <Avatar/>
                <input {...register("postTitle", {required:true})} disabled={!session} className="rounded-md flex-1 bg-gray-50 p-2 pl-5 outline-none" type="text" placeholder={session? "Create a post by entering a title!" : "Sign in to post!" }/>
                <PhotographIcon className={`h-6 text-gray-400 cursor-pointer`}/>
                <LinkIcon className="h-6 text-gray-400 cursor-pointer"/>
            </div>

            {!!watch("postTitle")&&(
                <div>
                    <h1>BOOM</h1>
                </div>
            )}
        </form>
    )
}

export default PostBox