import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import {useQuery} from "@apollo/client"
import Post from "./Post"
import {Jelly} from "@uiball/loaders"
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import SubredditRow from "../components/SubredditRow"

type Props = {
  topic?: string,
}

const Feed = ({topic}: Props) => {
  const {data, error} = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
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
    <div className="mt-5 space-y-4">
      {
        posts? 
          <div className="flex-1 flex">
            <div>
              {
                posts?.map((post) => (
                  <Post key={post.id} post={post}/>
                ))
              }
            </div>  
            
            <div className="sticky top-36 mx-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow topic={subreddit.topic} index={i} key={subreddit.id}/>
              ))}
            </div>
          </div>
        :
        <div className="flex w-full items-center justify-center p-10 text-xl">
          <Jelly size={50} color="#ff4501"/>
        </div>
      }


    </div>

  )
}

export default Feed