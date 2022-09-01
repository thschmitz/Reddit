import React from 'react'
import {useRouter} from "next/router"
import {SEARCH_USERNAME, GET_FOLLOWING_BY_USERNAME, GET_USER_BY_ID } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Link from "next/link"
import { Jelly } from '@uiball/loaders';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import User from '../../../components/User';

const following = () => {
    const {data:session} = useSession();
    const router = useRouter();



    const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })
    const user = dataUser?.getUserById;

    const {data: dataFollowing, loading: loadingFollowing} = useQuery(GET_FOLLOWING_BY_USERNAME, {
        variables: {
            username: user?.username,
        }
    })
    const following = dataFollowing?.getFollowing;

    console.log("following: ", following)

    if(loadingFollowing)
    return(
        <div className="flex w-full items-center justify-center p-20 text-xl">
            <Jelly size={50} color="#ff4501"/>
        </div>
    )

    return (
        <div className="mt-5 space-y-4 mx-auto my-7 max-w-5xl">
            <Link href={`/user/${router.query.id}`}><ArrowLeftIcon className="cursor-pointer" width={20}/></Link>

            {
                following?.length === 0 ?
                    <div className="flex w-full items-center justify-center p-20 text-xl">
                        <p>No followings yet</p>
                    </div>
                :

                    <div className="w-full items-center justify-center p-10 text-xl">
                        <div className="text-2xl text-center bg-white rounded-lg mt-10 p-4 flex-1 space-y-4 max-w-5xl my-7 mx-auto">
                            {
                                user?.username === session?.user?.name ?
                                    <h1>See <span className="text-red-400">{following?.length} following(es)</span> that <span className="underline">you</span> have</h1>
                                :
                                    <h1>See <span className="text-red-400">{following?.length} people</span> that <span className="underline">{user?.username}</span> follows</h1>
                            }
                        </div>
                        {
                            following?.map((following: any) => (
                                <User user={following} globalStatement={false} index={0} following={true}/>
                            ))
                        }
                        
                    </div>
                    
            }
        </div>

                
        
    )
}

export default following
/* className="mt-5 space-y-4 mx-auto my-7 max-w-5xl" */