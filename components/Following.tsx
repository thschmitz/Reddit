import React from 'react'
import Avatar from './Avatar'
import Link from "next/link"
import {SEARCH_USERNAME, GET_FOLLOWING_BY_USERNAME, GET_USER_BY_ID } from "../graphql/queries";
import { useQuery } from '@apollo/client';

type Props = {
    user: any
}

const User = ({user}: Props) => {

    const data = `${user.created_at[8]}${user.created_at[9]}/${user.created_at[5]}${user.created_at[6]}/${user.created_at[0]}${user.created_at[1]}${user.created_at[2]}${user.created_at[3]} ${user.created_at[11]}${user.created_at[12]}:${user.created_at[14]}${user.created_at[15]}`

    const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: user.following_id
        }
    })
    const username = dataUser?.getUserById;
    console.log(username?.username)

    return (
        <Link href={`/user/${user.id}`}>
            <div className="bg-white flex flex-1 p-5 cursor-pointer rounded-lg hover:bg-gray-300 mt-2">
                <div className="items-center space-x-2 flex">
                    <Avatar seed={username?.username} /> {/* subreddit[0] because it returns an array with the info*/}
                    <div>{username?.username}</div>
                    <div className="flex right-0 flex-1 max-w-lg">
                        <p className="pl-20"><span className="dateCreated">Following since: </span>{data}<span className="dateCreated">UTC</span></p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default User