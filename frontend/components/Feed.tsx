import { useQuery } from "@apollo/client"
import { GlobeIcon } from "@heroicons/react/outline"
import { Jelly } from "@uiball/loaders"
import { useSession } from 'next-auth/react'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import SubredditRow from "../components/SubredditRow"
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC, GET_FOLLOWER_ID, GET_ID_BY_USERNAME, GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import Post from "./Post"

type Props = {
  topic?: string,
}

const Feed = ({topic}: Props) => {
  const {data: session} = useSession();

  const {data: dataId, error: errorId} = useQuery(GET_FOLLOWER_ID, {
    variables: {
      username: session?.user?.name
    }
  })

  const {data: dataSession, error: errorSession} = useQuery(GET_ID_BY_USERNAME, {
    variables: {
      username: session?.user?.name
    }
  })

  const idSession = dataSession?.getIdByUsername?.id;

  console.log("idSession: ", idSession)

  const dataIdFollowing = dataId?.getFollowerId;
  console.log("dataIdFollowing: ", dataIdFollowing);

  const {data, error} = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
    variables: {
      topic: topic,
    }
  })
  const posts: Post[] = !topic? data?.getPostList : data?.getPostListByTopic;


  console.log("posts: ", posts)


  const {data: subredditData} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    }
  })

  const subreddits: Subreddit[] = subredditData?.getSubredditListLimit;


  return (
    <div className="mt-12 space-y-4">
      {
        idSession?
          posts? 
          <div className="flex-1 flex">
            <div>
              {
                topic?
                posts?.map((post:any) => (
                  <Post key={post.id} post={post} />
                ))
                :
                dataIdFollowing?.map((id: any) => (
                    posts?.map((post:any) => (
                      post?.usernameID === id.following_id ? <Post key={post.id} post={post} /> : <div className="invisible"></div>
                    ))
                ))
              }
            </div>  
            
            <div className="sticky top-44 mx-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow topic={subreddit.topic} index={i} key={subreddit.id}/>
              ))}
              <p className="text-md mb-1 p-4 pb-3 font-bold border-t flex">See global's posts in <Link href="/global"><div className="text-md font-bold -mt-1"><GlobeIcon className="icon"/></div></Link></p>
            </div>
          </div>
          :
          <div className="flex w-full items-center mt-52 justify-center p-10 text-xl">
            {
              <Jelly size={50} color="#ff4501"/>
            }
          </div>
        :
          <div className="flex flex-col w-full items-center mt-52 justify-center p-10 text-xl">
              <h1>Login to see your followers's content</h1>
              <Link href="/login"><button className="bg-red-400 p-3 rounded-2xl mt-4 text-white">Sign in</button></Link>
          </div>
        
      }


    </div>

  )
}

export default Feed