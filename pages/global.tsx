
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import {useQuery} from "@apollo/client"
import Post from "../components/Post"
import {Jelly} from "@uiball/loaders"
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import SubredditRow from "../components/SubredditRow"
import User from '../components/User'
import { GET_ALL_USERS } from '../graphql/queries'

const global = () => {
  const {data, error} =  useQuery(GET_ALL_POSTS)

  const posts: Post[] =  data?.getPostList;


  const {data: subredditData} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    }
  })

  const subreddits: Subreddit[] = subredditData?.getSubredditListLimit;

  const {data:dataUser, loading: loadingUser} = useQuery(GET_ALL_USERS)

  const users = dataUser?.getUsers;
  console.log(dataUser)

  return (
    <div className="mt-5 space-y-4 max-w-5xl my-7 mx-auto">
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
            
            <div className="sticky top-20 mx-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow topic={subreddit.topic} index={i} key={subreddit.id}/>
              ))}
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Users</p>
              {users?.map((user:any, i:number) => (
                <User key={user.id} user={user} globalStatement={true} index={i}/>
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

export default global