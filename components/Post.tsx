import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import React from 'react'
import Avatar from './Avatar'
import TimeAgo from "react-timeago"

type Props = {
    post: Post
}

const Post = ({post}: Props) => {
  return (
    <div className="flex rounded-md cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        {/*Votes*/}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
            <ArrowUpIcon className="voteButtons hover:text-red-400"/>
            <p className="text-xs font-bold text-black">0</p>
            <ArrowDownIcon className="voteButtons hover:text-red-400"/>
        </div>

        <div className="p-3 pb-1">
            {/*Header*/}
            <div className="items-center space-x-2 flex">
              <Avatar seed={post.subreddit[0]?.topic} /> {/* subreddit[0] because it returns an array with the info*/}
              <p className="text-xs text-gray-400">
                <span className="text-black font-bold hover:text-blue-400 hover:underline">r/{post.subreddit[0]?.topic}</span> -  
                Posted by {post.username} <TimeAgo date={post.created_at} />
              </p>
            </div>
            {/*Body*/}

            <div className="py-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm font-light">{post.body}</p>
            </div>

            {/*Image*/}

            {/*Footer*/}
        </div>
    </div>
  )
}

export default Post