import { useQuery } from "@apollo/client"
import { GlobeIcon } from "@heroicons/react/outline"
import { Jelly } from "@uiball/loaders"
import Link from "next/link"
import React from 'react'
import SubredditRow from "../components/SubredditRow"
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC, GET_FOLLOWER_ID, GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import Post from "./Post"

type Props = {
  topic?: string,
  user?: {id: number, nome: string, email: string, senhaHash: string, emailVerificado: number},
}

const Feed = ({topic, user}: Props) => {

  const {data: dataId, error: errorId} = useQuery(GET_FOLLOWER_ID, {
    variables: {
      username: user?.nome
    }
  })
  const dataIdFollowing = dataId?.getFollowerId;
  const idSession = user?.id;

  console.log("dataIdFollowing: ", user);

  const {data} = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
    variables: {
      topic: topic,
    }
  })
  const posts: Post[] = !topic? data?.getPostList : data?.getPostListByTopic;


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
                  <Post key={post.id} post={post} user={user} />
                ))
                :
                dataIdFollowing?.map((id: any) => (
                  posts?.map((post:any) => (
                    post?.usernameID === id.following_id ? <Post key={post.id} post={post} user={user}/> : <div className="invisible"></div>
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
              <h1>Login to see the content</h1>
              <Link href="/login"><button className="bg-red-400 p-3 rounded-2xl mt-4 text-white">Sign in</button></Link>
          </div>
        
      }


    </div>

  )
}

export default Feed