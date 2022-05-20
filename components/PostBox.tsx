import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import Avatar from "./Avatar"
import {LinkIcon, PhotographIcon} from "@heroicons/react/outline"
import {useForm} from "react-hook-form"
import { ADD_POST } from '../graphql/mutations'
import {useMutation} from "@apollo/client"

type FormData= {
    postTitle: string,
    postBody: string,
    postImage: string,
    subreddit: string,
}

const PostBox = () => {
    const {data:session} = useSession();
    const [addPost] = useMutation(ADD_POST)
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<FormData>()

    const onSubmit = handleSubmit( async(formData) => {
        console.log(formData)
    })

    return (
        <form onSubmit={onSubmit} className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2">
            <div className="flex items-center space-x-3">
                <Avatar/>
                <input {...register("postTitle", {required:true})} disabled={!session} className="rounded-md flex-1 bg-gray-50 p-2 pl-5 outline-none" type="text" placeholder={session? "Create a post by entering a title!" : "Sign in to post!" }/>
                <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 text-gray-400 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`}/>
                <LinkIcon className="h-6 text-gray-400 cursor-pointer"/>
            </div>

            {!!watch("postTitle")&&(
                <div className="flex flex-col py-2">
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Body:</p>
                        <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register("postBody", {required: true})} type="text" placeholder="Text (optional)"/>
                    </div>
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit:</p>
                        <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register("subreddit", {required: true})} type="text" placeholder="i.e react.js"/>
                    </div>
                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register("postImage")} type="text" placeholder="Optional..."/>
                        </div>
                    )}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-2 space-y-2 text-red-500">
                            {errors.postTitle?.type == "required" && (
                                <p>A Post Title is required!</p>
                            )}

                            {errors.subreddit?.type == "required" && (
                                <p>A Subreddit is required!</p>
                            )}
                        </div>
                    )}
                    {!!watch("postTitle") && (
                        <button className="bg-blue-400 p-2 w-full rounded-full text-white">Create Post</button>
                    )}
                </div>
            )}
        </form>
    )
}

export default PostBox