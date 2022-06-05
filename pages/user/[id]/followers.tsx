import React from 'react'
import {useRouter} from "next/router"
import {SEARCH_USERNAME, GET_ALL_FOLLOWERS, GET_USER_BY_ID } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Link from "next/link"
import User from '../../../components/User';
import { Jelly } from '@uiball/loaders';
import { ArrowLeftIcon } from '@heroicons/react/solid';

const followers = () => {
    const {data:session} = useSession();
    const router = useRouter();

    const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })
    
    const user = dataUser?.getUserById;

    const {data: dataFollowers, loading: loadingFollowers} = useQuery(GET_ALL_FOLLOWERS, {
        variables: {
            following_id: router.query.id,
        }
    })


    const followers = dataFollowers?.getFollowers;
    followers?.map((follower:any) => {
        console.log(follower)
    })

    return (
        <div className="mt-5 space-y-4 mx-auto my-7 max-w-5xl">
            <Link href={`/user/${router.query.id}`}><ArrowLeftIcon className="cursor-pointer" width={20}/></Link>
            {
                loadingFollowers?
                    <div className="flex w-full items-center justify-center p-20 text-xl">
                        <Jelly size={50} color="#ff4501"/>
                    </div>
                :
                    followers.length === 0 ?
                        <div className="flex w-full items-center justify-center p-20 text-xl">
                            <p>No followers yet</p>
                        </div>
                    :
                        user.username && followers?
                            <div className="w-full items-center justify-center p-10 text-xl">
                                <div className="text-2xl bg-white rounded-lg max-w-fit mt-10 p-4">
                                    {
                                        user?.username === session?.user?.name ?
                                            <h1>See <span className="text-red-400">{followers?.length} follower(es)</span> that <span className="underline">you</span> have</h1>
                                        :
                                            <h1>See <span className="text-red-400">{followers?.length} follower(es)</span> that <span className="underline">{user?.username}</span> has</h1>
                                    }
                                </div>
                                {
                                    followers?.map((follower: any) => (
                                        <User user={follower} globalStatement={false} index={0}/>
                                    ))
                                }
                                
                            </div>
                        :
                        ""
                }
        </div>

                
        
    )
}

export default followers
/* className="mt-5 space-y-4 mx-auto my-7 max-w-5xl" */