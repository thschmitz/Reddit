// /subreddit/${reactjs}
import { useRouter } from "next/router"
import React from 'react'
import Avatar from '../../components/Avatar'
import Feed from '../../components/Feed'
import PostBox from '../../components/PostBox'
import { withSession } from "../../src/auth/session"

export const getServerSideProps = withSession((ctx:any) => {
    const data = ctx.req.session;
    return {
      props: {
        data,
      }
    }
})

type Props = {
    props?: {id: number, nome: string, email: string, senhaHash: string, emailVerificado: number},
}

function Subreddit(props: Props) {
    const {query: {topic}} = useRouter()
    const user = props?.data?.usuarioInfo;
    console.log("subredditUser: ", user)
    return(
        <div className={`h-24 bg-red-400 p-8`}>
            <div className="-mx-8 mt-10 bg-white">
                <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                    <div className="-mt-5">
                        <Avatar seed={topic as string} large />
                    </div>
                    <div className="py-2">
                        <h1 className="text-3xl font-semibold">Welcome to the r/{topic} subreddit</h1>
                        <p className="text-sm text-gray-400">r/{topic}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl mt-8">
                <PostBox subreddit={topic as string} user={user}/>
                <div className="mt-32">
                    <Feed topic={topic as string} user={user}/>
                </div>
            </div>
        </div>
    )
}

export default Subreddit;