import React from 'react'
import {useRouter} from "next/router"
import {SEARCH_USERNAME, GET_ALL_FOLLOWERS, GET_USER_BY_ID } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Link from "next/link"
import User from '../../../components/User';
import { Jelly } from '@uiball/loaders';

const followers = () => {
    const {data:session} = useSession();
    const router = useRouter();

    const {data: dataFollowers, loading: loadingFollowers} = useQuery(GET_ALL_FOLLOWERS, {
        variables: {
            following_id: router.query.id,
        }
    })

    const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })
    const user = dataUser?.getUserById;
    const followers = dataFollowers?.getFollowers;

    return (
        <div className="mt-5 space-y-4 mx-auto my-7 max-w-5xl">
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

                        <div className="w-full items-center justify-center p-10 text-xl">
                            <div className="text-2xl bg-white rounded-lg max-w-fit mt-10 p-4">
                                <h1>See <span className="text-red-400">{followers.length} follower(es)</span> that <span className="underline">{user?.username}</span> has</h1>
                            </div>
                            {
                                followers.map((follower: any) => (
                                    <User user={follower}/>
                                ))
                            }
                            
                        </div>
                    
            }
        </div>

                
        
    )
}

export default followers
/* className="mt-5 space-y-4 mx-auto my-7 max-w-5xl" */