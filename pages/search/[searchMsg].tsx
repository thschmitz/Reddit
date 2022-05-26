import React from 'react'
import {useRouter} from "next/router"
import {GET_ALL_POST_WITH_SEARCH} from "../../graphql/queries"
import {useQuery} from "@apollo/client"
import Post from "../../components/Post"
import {Jelly} from "@uiball/loaders"
import { GET_SUBREDDITS_WITH_LIMIT } from '../../graphql/queries'
import SubredditRow from "../../components/SubredditRow"

const searchMsg = () => {
    const router = useRouter();

    const {data, loading, error} = useQuery(GET_ALL_POST_WITH_SEARCH, {
        variables:{
            search: router.query.searchMsg
        }
    })

    const posts: Post[] = data?.getPostBySearch;

    if(posts){
        console.log("posts: ", posts.length)
    }

    const {data: subredditData} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
        variables: {
          limit: 10,
        }
      })
    
    const subreddits: Subreddit[] = subredditData?.getSubredditListLimit;

    console.log(subreddits)

    return (
        <div className="mt-5 space-y-4 mx-auto my-7 max-w-5xl">
                <div className="flex-1 flex ">
                    <div className="optionButtons">
                        <button>Posts</button>
                    </div>
                    <div className="optionButtons">
                        <button>Users</button>
                    </div>
                </div>
            {
                posts?
""
                
                :
                ""
            }
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

export default searchMsg