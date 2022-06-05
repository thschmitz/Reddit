import React from 'react'
import {useRouter} from "next/router"
import { GET_MARK_BY_ID, GET_USER_BY_ID } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Link from "next/link"
import { Jelly } from '@uiball/loaders';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import User from '../../../components/User';
import Post from '../../../components/Post';

const following = () => {
    const {data:session} = useSession();
    const router = useRouter();

    const {data: dataUser } = useQuery(GET_USER_BY_ID, {
        variables: {
            id: router.query.id
        }
    })

    const user = dataUser?.getUserById;


    const {data: dataMarks, loading: loadingMarks, error: errorMarks} = useQuery(GET_MARK_BY_ID, {
        variables: {
            id: router.query.id
        }
    });

    const postsMarked = dataMarks?.getMarkById;

    console.log("teste: ", postsMarked)

    postsMarked?.map((post:any) => {
        console.log("post: ", post?.posts?.subreddit[0])
    })

    if(loadingMarks) 
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#ff4501"/>
      </div>
    )

    if(user?.username !== session?.user?.name) 
    return(
        <div className="flex w-full items-center justify-center p-20 text-xl">
            <p>You are not allowed to see this page</p>
        </div>
    )

    return (
        <div className="mt-5 space-y-4 mx-auto my-7 max-w-5xl">
            
            <Link href={`/user/${router.query.id}`}><ArrowLeftIcon className="cursor-pointer" width={20}/></Link>
            <div className="mt-10">
                {
                    postsMarked.length > 0?
                        <div>
                            <h1 className="font-bold text-2xl mb-10 bg-white rounded-lg max-w-fit mt-10 p-4">See <span className="text-red-400">{postsMarked?.length} marked posts</span> that <b className="underline">you</b> have</h1>
                            {
                                postsMarked?.map((post:any, index: any) => (
                                    <div key={index} className="mt-10">
                                        <Post post={post.posts} key={index} />
                                    </div>
                                ))
                            }
                        </div>
                    :
                    <div className="flex w-full items-center justify-center p-20 text-xl">
                        No marked posts yet
                    </div>
                }
            </div>
        
        </div>

                
        
    )
}

export default following
/* className="mt-5 space-y-4 mx-auto my-7 max-w-5xl" */