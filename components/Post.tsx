import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import React, {useEffect, useState} from 'react'
import Avatar from './Avatar'
import TimeAgo from "react-timeago"
import Link from "next/link"
import {Jelly} from "@uiball/loaders"
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { GET_ALL_VOTES_BY_POST_ID, GET_ALL_POSTS, GET_ID_BY_USERNAME, GET_MARK } from '../graphql/queries'
import {ADD_MARK, DELETE_COMMENT, DELETE_MARK, DELETE_POST, DELETE_VOTE} from "../graphql/mutations"
import {useQuery, useMutation} from "@apollo/client"
import {ADD_VOTE} from "../graphql/mutations"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type Props = {
    post: Post
}

const Post = ({post}: Props) => {
  const [vote, setVote] = useState<boolean>()
  const [marked, setMarked] = useState<boolean>(false)
  const {data:session} = useSession()
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: {
      id: post?.id
    }
  })

  const {data: dataId, loading: loadingId, error: errorId} = useQuery(GET_ID_BY_USERNAME, {
    variables:{
        username: post?.username
    }
  })

  const id = dataId?.getIdByUsername?.id;

  const {data: dataIdUsername, loading: loadingIdUsername, error: errorIdUsername} = useQuery(GET_ID_BY_USERNAME, {
    variables:{
      username: session?.user?.name
    }
  })

  const idUsername = dataIdUsername?.getIdByUsername?.id;

  const {data: dataMark, error: errorMark, loading: loadingMark} = useQuery(GET_MARK, {
    variables: {
      username: session?.user?.name,
      post_id: post?.id,
    }
  })

  const marks = dataMark?.getMark.length;

  const [addMark] = useMutation(ADD_MARK)
  const [deleteMark] = useMutation(DELETE_MARK)
  const [deleteVote] = useMutation(DELETE_VOTE, {
    variables: {
      id: post?.id
    }
  })
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [
      GET_ALL_POSTS, "getPostList"
    ],
    variables: {
      id: post?.id
    }
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    deleteVote()
    deleteComment()
    deletePost()
    handleClose()
  }

  const {data, loading, error} = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id
    }
  })



  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"]
  })

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    const vote = votes?.find((vote) => vote.username == session?.user?.name)?.upvote

    setVote(vote)


  }, [data])

  useEffect(() => {
    if(marks > 0) {
      setMarked(true)
    }
  }, [marks])

  const upVote = async(isUpvote: boolean) => {
    if(!session) {
      toast("You will need to sign in to Vote!");
      return;
    }
    const notification = toast.loading("Liking...");

    if(vote && isUpvote) {     
      toast.error("You have already voted", {
        id: notification
      });
      return
    }
    if(vote === false && !isUpvote) return;

    
    const {data: {insertVote: newVote}} = await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote
      }
    })

    if(isUpvote == true){
      toast.success("Sucessfully Upvote", {
        id: notification
      })
    } else {
      toast.success("Sucessfully Downvote", {
        id: notification
      })
    }
  }

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )

    if(votes?.length === 0) return 0;

    if(displayNumber === 0) {
      return votes[0].upvote ? 1 : -1;
    }

    return displayNumber;
  }

  const markedFunction  = async (e:any) => {
    e.preventDefault();

    if(!session) {
      toast("You will need to sign in to Mark!");
      return;
    }

    if(marked) {
      setMarked(false)
      const {data: {deleteMark: newMark}} = await deleteMark({
        variables: {
          post_id: post?.id,
          username: session?.user?.name,
          usernameID: idUsername
        },
        refetchQueries: [GET_MARK, "getMark"]
      })
      return;
    } else {
      setMarked(true)
      const {data: {insertMark: newMark}} = await addMark({
        variables: {
          post_id: post?.id,
          username: session?.user?.name,
          usernameID: idUsername
        },
        refetchQueries: [GET_MARK, "getMark"]
      })
      return;
    }

  }
    

  if(!post) 
  return (
    <div className="flex w-full items-center justify-center p-10 text-xl">
      <Jelly size={50} color="#ff4501"/>
    </div>
  )



  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex rounded-md cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
          {/*Votes*/}
          <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
              <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-red-400 ${vote && "text-red-400"}`}/>
              <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
              <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons hover:text-red-400 ${vote == false && "text-blue-400"}`}/>
          </div>

          <div className="p-3 pb-1">
              {/*Header*/}
              <div className="items-center space-x-2 flex">
                <Avatar seed={post?.subreddit[0]?.topic} /> {/* subreddit[0] because it returns an array with the info*/}
                <p className="text-xs text-gray-400">
                  
                  <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                    <span className="text-black font-bold hover:text-blue-400 hover:underline">
                      r/{post.subreddit[0]?.topic}
                    </span>  
                  </Link>
                  {" "}
                  • Posted by <Link href={`/user/${id}`}><a className="hover:text-blue-400 hover:underline">u/{post.username}</a></Link> <TimeAgo date={post.created_at} />  
                  
                </p>
              </div>
              {/*Body*/}

              <div className="py-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm font-light">{post.body}</p>
              </div>

              {/*Image*/}

              <img className="w-full" src={post.image} alt="" /> 

              {/*Footer*/}

              <div className="flex space-x-4 text-gray-400">
                <div className="postButtons">
                  <ChatAltIcon className="h-6 w-6"></ChatAltIcon>
                  <p className="hidden sm:inline">{post.comments.length} Comments</p>
                  <p className="inline sm:hidden">{post.comments.length}</p>
                </div>             
                <div onClick={(e) => markedFunction(e)} className="postButtons">
                  <BookmarkIcon className={`h-6 w-6 ${marked? "text-yellow-500" : ""}`}></BookmarkIcon>
                  <p className={`${marked? "text-yellow-500" : ""}`}>{marks}</p>
                  <p className={`hidden sm:inline ${marked ? "text-yellow-500" : ""}`}>Marks</p>
                </div>              
                <div className="postButtons">
                {
                  post?.username === session?.user?.name ?
                    <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <DotsHorizontalIcon className="h-6 w-6 text-gray-400"></DotsHorizontalIcon>
                  </Button>
                  :
                  ""
                }

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {
                    session?.user?.name === post.username ?
                      <div>
                        <Link href="/"><MenuItem onClick={handleDeletePost}>Delete Post</MenuItem></Link>
                        <MenuItem onClick={handleClose}>Edit Post</MenuItem>
                      </div>
                      
                    :
                    ""
                  }

                </Menu>
                  
                </div>
              </div>
          </div>
      </div>
    </Link>
    
  )
}

export default Post