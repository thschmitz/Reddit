import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router"
import { GET_USER_BY_ID, GET_POST_BY_USERNAME, GET_ID_BY_USERNAME, GET_FOLLOW_BY_USERNAME_AND_ID } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import Avatar from '../../components/Avatar'
import { Jelly } from '@uiball/loaders';
import Post from "../../components/Post"
import { HeartIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { DELETE_FOLLOW, INSERT_FOLLOW } from '../../graphql/mutations';

const searchMsg = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [liked, setLiked] = useState(false)

    const {data: dataFollowing, loading: loadingFollowing, error: errorFolowwing} = useQuery(GET_FOLLOW_BY_USERNAME_AND_ID, {
        refetchQueries: [
            GET_FOLLOW_BY_USERNAME_AND_ID, "getFollowByUsernameAndId"
        ],
        variables: {
            username: session?.user?.name,
            id: router?.query?.id
        }
    })


    

    const {data, loading, error} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })

    const followed = dataFollowing?.getFollowByUsernameAndId;


    useEffect(() => {
        followed?.map((follow: any) => (
            follow.follow === true ? setLiked(true) : setLiked(false)
        ))
        
    }, [followed])

    const user = data?.getUserById;

    const {data: post, loading: loadingPost, error: errorPost} = useQuery(GET_POST_BY_USERNAME, {
        variables:{
            username: user?.username
        }
    })

    const posts: Post[] = post?.getPostByUsername;
    const createdHour = `${user?.created_at[8]}${user?.created_at[9]}/${user?.created_at[5]}${user?.created_at[6]}/${user?.created_at[0]}${user?.created_at[1]}${user?.created_at[2]}${user?.created_at[3]} ${user?.created_at[11]}${user?.created_at[12]}:${user?.created_at[14]}${user?.created_at[15]}`
    const qtdPosts = posts?.length;

    const [insertFollow] = useMutation(INSERT_FOLLOW)
    const [deleteFollow] = useMutation(DELETE_FOLLOW)

    const heartSubmit = async () => {

        if(liked){
            setLiked(false);
            const {data: {insertFollow: newFollow}} = await deleteFollow({
                variables: {
                    username: session?.user?.name,
                    following_id: router.query.id,
                }  
            });
            console.log("unfollowed")
        } else {
            setLiked(true);
            const {data: {insertFollow: newFollow}} = await insertFollow({
                variables: {
                    username: session?.user?.name,
                    following_id: router.query.id,
                    follow: true,
                }  
            });
            console.log("followed")
        }
    }



    return (
        <div className={`h-24 bg-red-400 p-8`}>
            {user?
                <div>
                    <div className="-mx-8 mt-10 bg-white">
                        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                            <div className="-mt-5">
                                <Avatar seed={user?.username} large />
                            </div>
                            <div className="py-2">
                                <h1 className="text-3xl font-semibold">Welcome to r/{user?.username} Profile</h1>
                                <p><span className="dateCreated">Created Time: </span>{createdHour}<span className="dateCreated"> GMT</span></p>
                                {
                                    session?.user?.name !== user?.username ?
                                        <HeartIcon width={40} height={40} onClick={heartSubmit} className={liked? `text-red-400 cursor-pointer` : `text-black cursor-pointer`}/>
                                    :
                                    ""

                                }
                            </div>

                        </div>
                        <div className="follow">
                        </div>
                    </div>

                    {
                        loadingPost ?
                            ""
                            :
                            posts?.length > 0?
                            <div className="text-2xl bg-white rounded-lg max-w-fit mt-10 p-4">
                                <h1>See <span className="text-red-400">{qtdPosts} post(s)</span> that <span className="underline">{user?.username}</span> has already created</h1>
                            </div>
                    :
                        <h1>This user has not created any post yet</h1>
                    }
                    <div className="mt-10 flex-1 space-y-4">
                        {
                            loadingPost?
                                <div className="flex w-full items-center justify-center p-20 text-xl">
                                    <Jelly size={50} color="#ff4501"/>
                                </div>
                            :                                
                                    posts?.length > 0?
                                    posts.map((post: any) => (
                                        <Post key={post.id} post={post}/>
                                    ))

                                

                                :
                                    <div className="flex w-full items-center justify-center p-20 text-xl">
                                        <p>No posts found</p>
                                    </div>
                        }

                    </div>
                </div>
            :
            <div className="flex w-full items-center justify-center p-20 text-xl">
                <Jelly size={50} color="#ff4501"/>
            </div>

            }


        </div>
        
    )
}

export default searchMsg