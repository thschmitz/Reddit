import { useMutation, useQuery } from '@apollo/client';
import { BookmarkIcon, HeartIcon } from '@heroicons/react/solid';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Avatar from '../../components/Avatar';
import Post from "../../components/Post";
import { DELETE_FOLLOW, INSERT_FOLLOW } from '../../graphql/mutations';
import { GET_ALL_FOLLOWERS, GET_FOLLOWING_BY_USERNAME, GET_FOLLOW_BY_USERNAME_AND_ID, GET_MARK, GET_MARK_BY_ID, GET_POST_BY_USERNAME, GET_USER_BY_ID } from '../../graphql/queries';
import { withSession } from "../../src/auth/session";

export const getServerSideProps = withSession((ctx) => {
    const data = ctx.req.session;
    return {
      props: {
        data,
      }
    }
  })

const searchMsg = (props) => {
    const router = useRouter();
    const [liked, setLiked] = useState(false)
    const session = props?.data?.usuarioInfo;

    console.log("IdProps: ", props?.data?.usuarioInfo)

    const {data: dataFollowers, loading: loadingFollowing, error: errorFollowing} = useQuery(GET_FOLLOW_BY_USERNAME_AND_ID, {
        variables: {
            username: session?.nome,
            id: router?.query?.id
        }
    })


    const {data: dataFollower } = useQuery(GET_ALL_FOLLOWERS, {
        variables: {
            following_id: router.query.id,
        }
    })

    const {data, loading, error} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: router.query.id
        }
    })

    const followed = dataFollowers?.getFollowByUsernameAndId;
    const followers = dataFollower?.getFollowers?.length;

    useEffect(() => {
        followed?.map((follow) => (
            follow.follow === true ? setLiked(true) : setLiked(false)
        ))
    }, [followed])

    const user = data?.getUserById;

    const {data: dataFollowing} = useQuery(GET_FOLLOWING_BY_USERNAME, {
        variables: {
            username: user?.username,
        }
    })

    const {data: post, loading: loadingPost, error: errorPost} = useQuery(GET_POST_BY_USERNAME, {
        variables:{
            username: user?.username
        }
    })

    const {data: dataMark, loading: loadingMark, error: errorMark} = useQuery(GET_MARK_BY_ID, {
        variables: {
            id: router?.query?.id
        }
    })
    
    const marks = dataMark?.getMarkById?.length;
    const following = dataFollowing?.getFollowing?.length;
    const posts = post?.getPostByUsername;
    const createdHour = `${user?.created_at[8]}${user?.created_at[9]}/${user?.created_at[5]}${user?.created_at[6]}/${user?.created_at[0]}${user?.created_at[1]}${user?.created_at[2]}${user?.created_at[3]} ${user?.created_at[11]}${user?.created_at[12]}:${user?.created_at[14]}${user?.created_at[15]}`
    const qtdPosts = posts?.length;

    const [insertFollow] = useMutation(INSERT_FOLLOW, {
        refetchQueries: [
            GET_ALL_FOLLOWERS, "getFollowers"
        ]
    })
    const [deleteFollow] = useMutation(DELETE_FOLLOW, {
        refetchQueries: [
            GET_ALL_FOLLOWERS, "getFollowers"
        ]
    })
    const heartSubmit = async () => {
        const notification = toast.loading("Creating new Post...");
        if(liked){
            setLiked(false);
            toast.success("Sucessfully Unfollowed", {
                id: notification
            })
            const {data: {insertFollow: newFollow}} = await deleteFollow({
                variables: {
                    username: session?.nome,
                    following_id: router.query.id,
                }  
            });
        } else {
            setLiked(true);
            toast.success("Sucessfully Followed", {
                id: notification
            })
            const {data: {insertFollow: newFollow}} = await insertFollow({
                variables: {
                    username: session?.nome,
                    following_id: router.query.id,
                    follow: true,
                }  
            });
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
                                {
                                    user?.id === router.query.id?
                                        <h1 className="text-3xl font-semibold">Welcome to your Profile</h1>
                                    :
                                        <h1 className="text-3xl font-semibold">Welcome to r/{user?.username} Profile</h1>
                                }
                                <p><span className="dateCreated">Created Time: </span>{createdHour}<span className="dateCreated"> GMT</span></p>
                                {
                                    session?.nome !== user?.username ?
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-5 space-x-1">
                                            <Link href={`/user/${router.query.id}/followers`}>
                                                <p className="cursor-pointer">Followers •</p>
                                            </Link>
                                            <p className="font-bold text-xl">{followers}</p>
                                            <HeartIcon width={30} height={30} onClick={heartSubmit} className={liked? `text-red-400 cursor-pointer` : `text-black cursor-pointer`}/>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Link href={`/user/${router.query.id}/following`}>
                                                <p className="cursor-pointer">Following •</p>
                                            </Link>
                                            <p className="font-bold text-xl">{following}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-5 space-x-1">
                                            <Link href={`/user/${router.query.id}/followers`}>
                                                <p className="cursor-pointer">Followers •</p>
                                            </Link>
                                            <p className="font-bold text-xl">{followers}</p>
                                        </div>
                                        <div className="flex items-center mr-5 space-x-1">
                                            <Link href={`/user/${router.query.id}/following`}>
                                                <p className="cursor-pointer">Following •</p>
                                            </Link>
                                            <p className="font-bold text-xl">{following}</p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Link href={`/user/${router.query.id}/marks`}>
                                                <p className="cursor-pointer">Marks •</p>
                                            </Link>
                                            <p className="font-bold text-xl">{marks}</p>
                                            <BookmarkIcon width={22} height={22} className="text-yellow-500"/>
                                        </div>
                                    </div>

                                }
                            </div>

                        </div>
                    </div>

                    {
                        loadingPost ?
                            ""
                            :
                            posts?.length > 0?
                            <div className="text-2xl text-center bg-white rounded-lg mt-10 p-4 flex-1 space-y-4 max-w-5xl my-7 mx-auto">
                                {
                                    session?.nome === user.username ?
                                        <h1>See <span className="text-red-400">{qtdPosts} post(s)</span> that <span className="underline">you</span> have already created</h1>
                                    :
                                        <h1>See <span className="text-red-400">{qtdPosts} post(s)</span> that <span className="underline">{user?.username}</span> has already created</h1>
                                }
                            </div>
                    :
                            ""
                    }
                    <div className="mt-10 flex-1 space-y-4 max-w-5xl my-7 mx-auto">
                        {
                            loadingPost?
                                <div className="flex w-full items-center justify-center p-20 text-xl">
                                    <Jelly size={50} color="#ff4501"/>
                                </div>
                            :                                
                                    posts?.length > 0?
                                        posts.map((post) => (
                                            <Post key={post.id} post={post} user={session}/>
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