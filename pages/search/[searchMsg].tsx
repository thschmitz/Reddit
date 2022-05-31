import React, {useState} from 'react'
import {useRouter} from "next/router"
import {GET_ALL_POST_WITH_SEARCH} from "../../graphql/queries"
import {useQuery} from "@apollo/client"
import Post from "../../components/Post"
import {Jelly} from "@uiball/loaders"
import { GET_SUBREDDITS_WITH_LIMIT, GET_ALL_USERS, GET_ALL_USERS_BY_SEARCH } from '../../graphql/queries'
import SubredditRow from "../../components/SubredditRow"
import User from "../../components/User"

const searchMsg = () => {
    const router = useRouter();

    const [postButton, setPostButton] = useState(true)
    const [userButton, setUserButton] = useState(false)

    const {data, loading, error} = useQuery(GET_ALL_POST_WITH_SEARCH, {
        variables:{
            search: router.query.searchMsg
        }
    })

    const {data: dataUsers, loading: loadingUsers, error: errorUsers} = useQuery(GET_ALL_USERS_BY_SEARCH, {
        variables:{
            search: router.query.searchMsg
        }
    })


    const posts: Post[] = data?.getPostBySearch;
    const users = dataUsers?.getUsersBySearch;

    const {data: subredditData} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
        variables: {
          limit: 10,
        }
      })
    
    const subreddits: Subreddit[] = subredditData?.getSubredditListLimit;

    function handleSubmitPost () {
        setPostButton(true)
        setUserButton(false)
    }

    function handleSubmitUsers () {
        setPostButton(false)
        setUserButton(true)
    }

    return (
        <div className="mt-5 space-y-4 mx-auto my-7 max-w-5xl">
            <div className="flex w-full items-center justify-center p-3">
                {
                    postButton?
                    <div className="optionButtons bg-red-400 text-white">
                        <button>Posts</button>
                    </div>
                    :
                    <div className="optionButtons">
                        <button onClick={handleSubmitPost}>Posts</button>
                    </div>
                }
                {
                    userButton?

                    <div className="optionButtons bg-red-400 text-white">
                        <button>Users</button>
                    </div>
                    :
                    <div className="optionButtons">
                        <button onClick={handleSubmitUsers}>Users</button>
                    </div>
                }

            </div>

            {
                postButton?

                
                    posts? 
                        posts.length !== 0 ?
                            <div className="flex-1 flex">
                                <div>
                                    {
                                        posts?.map((post) => (
                                        <Post key={post.id} post={post}/>
                                        ))
                                    }
                                </div>  
                                
                                <div className="sticky top-40 mx-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
                                    <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
                                    {subreddits?.map((subreddit, i) => (
                                        <SubredditRow topic={subreddit.topic} index={i} key={subreddit.id}/>
                                    ))}
                                </div>
                            </div>
                        :
                        <div className="flex w-full items-center justify-center p-20 text-xl">
                            No posts found
                        </div>
                    :
                    <div className="flex w-full items-center justify-center p-10 text-xl">
                        <Jelly size={50} color="#ff4501"/>
                    </div>
                :
                <div className="w-full items-center justify-center p-10 text-xl">
                    {
                        loadingUsers?
                        <div className="flex w-full items-center justify-center p-10 text-xl">
                            <Jelly size={50} color="#ff4501"/>
                        </div>
                        :
                        users?.map((user: any) => (
                            <div key={user.id}>
                                <User user={user} />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
        
    )
}

export default searchMsg