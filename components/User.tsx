import React from 'react'
import Avatar from './Avatar'
import Link from "next/link"
import { GET_ID_BY_USERNAME, GET_USER_BY_ID } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import { ChevronUpIcon } from '@heroicons/react/solid'
import { Jelly } from '@uiball/loaders';

type Props = {
    user: any,
    globalStatement: boolean,
    index:number,
}

const User = ({user, globalStatement, index}: Props) => {

    const data = `${user.created_at[8]}${user.created_at[9]}/${user.created_at[5]}${user.created_at[6]}/${user.created_at[0]}${user.created_at[1]}${user.created_at[2]}${user.created_at[3]} ${user.created_at[11]}${user.created_at[12]}:${user.created_at[14]}${user.created_at[15]}`

    const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GET_ID_BY_USERNAME, {
        variables:{
            username: user.username
        }
    })

    const userId = dataUser?.getIdByUsername;

    const {data: dataFollowing, loading: loading, error: error} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: user.following_id
        }
    })
    const username = dataFollowing?.getUserById;

    if(loading)
    return(
        <div className="flex w-full items-center justify-center p-20 text-xl">
            <Jelly size={50} color="#ff4501"/>
        </div>
    )

    return (
        <div>
            {
            !globalStatement?

                <Link href={`/user/${username?.id || userId?.id || user.id}`}>
                    <div className="bg-white flex flex-1 p-5 cursor-pointer rounded-lg hover:bg-gray-300 mt-2">
                        <div className="items-center space-x-2 flex">
                            <Avatar seed={username?.username || user?.username} /> {/* subreddit[0] because it returns an array with the info*/}
                            <div>{username?.username || user?.username  }</div>
                            <p className="pl-20"><span className="dateCreated">Entered in: </span>{data}<span className="dateCreated">UTC</span></p>
                        </div>
                    </div>
                </Link>
                
                
            :
                <div className="flex items-center space-x-2 border-t bg-white px-4 py-2">
                    <p>{index + 1}</p>
                    <ChevronUpIcon className="h-4 w-4 flex-schrink-0 text-green-400"/>
                    <Avatar seed={user.username} />
                    <p className="flex-1 truncate">r/{user.username}</p>
                    <Link href={`/user/${user.id}`}>
                        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
                            View
                        </div>
                    </Link>
        
                </div>
            }
        </div>
    )
}

export default User