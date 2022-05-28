import React from 'react'
import Avatar from './Avatar'
import Link from "next/link"

type Props = {
    user: any
}

const User = ({user}: Props) => {

    const data = `${user.created_at[8]}${user.created_at[9]}/${user.created_at[5]}${user.created_at[6]}/${user.created_at[0]}${user.created_at[1]}${user.created_at[2]}${user.created_at[3]} ${user.created_at[11]}${user.created_at[12]}:${user.created_at[14]}${user.created_at[15]}`

    return (
        <Link href={`/user/${user.username}`}>
            <div className="bg-white flex flex-1 p-5 cursor-pointer rounded-lg hover:bg-gray-300">
                <div className="items-center space-x-2 flex">
                    <Avatar seed={user?.username} /> {/* subreddit[0] because it returns an array with the info*/}
                    <div>{user.username}</div>
                    <p className="pl-10"><span className="text-gray-400 text-sm">Entered in: </span>{data}<span className="text-gray-400 text-sm">GMT</span></p>
                </div>
            </div>
        </Link>
    )
}

export default User