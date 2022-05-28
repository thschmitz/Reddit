import React, {useState} from 'react'
import {useRouter} from "next/router"
import { GET_USER_BY_ID } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import Avatar from '../../components/Avatar'
import PostBox from '../../components/PostBox'
import Feed from '../../components/Feed'
import { Jelly } from '@uiball/loaders';

const searchMsg = () => {
    const router = useRouter();

    const {data, loading, error} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })

    const user = data?.getUserById;

    console.log("user: ", user?.username)
    const createdHour = `${user?.created_at[8]}${user?.created_at[9]}/${user?.created_at[5]}${user?.created_at[6]}/${user?.created_at[0]}${user?.created_at[1]}${user?.created_at[2]}${user?.created_at[3]} ${user?.created_at[11]}${user?.created_at[12]}:${user?.created_at[14]}${user?.created_at[15]}`

    return (
        <div className={`h-24 bg-red-400 p-8`}>
            {user?
                <div className="-mx-8 mt-10 bg-white">
                    <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                        <div className="-mt-5">
                            <Avatar seed="a" large />
                        </div>
                        <div className="py-2">
                            <h1 className="text-3xl font-semibold">Welcome to the r/{user?.username} Profile</h1>
                            <p>{createdHour}</p>
                        </div>
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