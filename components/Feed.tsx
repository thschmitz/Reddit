import React, {useState, useEffect} from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC, GET_SUBREDDITS_WITH_LIMIT, GET_FOLLOWER_ID, GET_ID_BY_USERNAME } from '../graphql/queries'
import {useQuery} from "@apollo/client"
import Post from "./Post"
import {Jelly} from "@uiball/loaders"
import SubredditRow from "../components/SubredditRow"
import { useSession } from 'next-auth/react'
import {GlobeIcon} from "@heroicons/react/outline"
import Link from "next/link"

type Props = {
  topic?: string,
}

const Feed = ({topic}: Props) => {
  const {data: session} = useSession();
  const [nothing, setNothing] = useState(false)

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

  const idSession = dataSession?.getIdByUsername.id;

  console.log("idSession: ", idSession)

  const dataIdFollowing = dataId?.getFollowerId;
  console.log("dataIdFollowing: ", dataIdFollowing);

  const {data, error} = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
    variables: {
      topic: topic,
    }
  })
  const posts: Post[] = !topic? data?.getPostList : data?.getPostListByTopic;


  console.log("postsFollower: ", posts?.length)


  const {data: subredditData} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    }
  })

  const subreddits: Subreddit[] = subredditData?.getSubredditListLimit;

  var soma = 0;

  useEffect(() => {
    if(soma === posts?.length){
      setNothing(true)
    }
  }, [soma])
  

  return (
    <div className="-mt-24 space-y-4">
      {
        posts? 
          <div className="flex-1 flex">
            <div>
              {
                dataIdFollowing?.map((id: any) => (
                    posts?.map((post:any) => (
                      post?.usernameID === id.following_id ? <Post key={post.id} post={post} /> : <div className="invisible">{soma+=1}</div>
                    ))
                ))
              }
            </div>  
              {
                nothing ? 
                <div className="text-center m-20 items-center mr-52">
                  <h1 className="text-2xl font-bold">Follow someone to see their posts</h1>
                  <h1 className="text-xl">Go to <b className="underline hover:bg-red-400 rounded-full hover:p-1"><Link href="/global">Global</Link></b> and find some friends</h1>
                </div>
                :
                ""
              }
            
            <div className="sticky top-44 mx-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow topic={subreddit.topic} index={i} key={subreddit.id}/>
              ))}
            </div>
          </div>
        :
        <div className="flex w-full items-center mt-52 justify-center p-10 text-xl">
          <Jelly size={50} color="#ff4501"/>
        </div>
      }


    </div>

  )
}

export default Feed