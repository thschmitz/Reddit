import React, {useState} from 'react'
import {useRouter} from "next/router"
import { GET_USER_BY_ID, GET_POST_BY_USERNAME, GET_ID_BY_USERNAME } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import Avatar from '../../components/Avatar'
import { Jelly } from '@uiball/loaders';
import Post from "../../components/Post"

const searchMsg = () => {
    const router = useRouter();

    const {data, loading, error} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })



    const user = data?.getUserById;

    const {data: post, loading: loadingPost, error: errorPost} = useQuery(GET_POST_BY_USERNAME, {
        variables:{
            username: user?.username
        }
    })



    const posts: Post[] = post?.getPostByUsername;

    console.log("post: ", post)

    console.log("user: ", user?.username)
    const createdHour = `${user?.created_at[8]}${user?.created_at[9]}/${user?.created_at[5]}${user?.created_at[6]}/${user?.created_at[0]}${user?.created_at[1]}${user?.created_at[2]}${user?.created_at[3]} ${user?.created_at[11]}${user?.created_at[12]}:${user?.created_at[14]}${user?.created_at[15]}`

    return (
        <div className={`h-24 bg-red-400 p-8`}>
            {user?
                <div>
                    <div className="-mx-8 mt-10 bg-white">
                        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                            <div className="-mt-5">
                                <Avatar seed={user?.username} large />
                            </div>
                            <div className="py-2">
                                <h1 className="text-3xl font-semibold">Welcome to the r/{user?.username} Profile</h1>
                                <p><span className="dateCreated">Created Time: </span>{createdHour}<span className="dateCreated"> GMT</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex-1 space-y-4">
                        {
                            posts?
                                posts.map((post: any) => (
                                        <Post key={post.id} post={post}/>
                                ))
                            :
                                <div className="flex w-full items-center justify-center p-20 text-xl">
                                    <Jelly size={50} color="#ff4501"/>
                                </div>
                        }
                    </div>
                </div>
            :
            <div className="flex w-full items-center justify-center p-20 text-xl">
                <Jelly size={50} color="#ff4501"/>
            </div>

            }


        </div>
        
    )
}

export default searchMsg