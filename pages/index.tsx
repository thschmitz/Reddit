import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from "../components/PostBox"
import Feed from "../components/Feed"
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import {useQuery} from "@apollo/client"
import SubredditRow from "../components/SubredditRow"

const Home: NextPage = () => {

  const {data} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    }
  })

  const subreddits: Subreddit[] = data?.getSubredditListLimit;
  console.log("Subreddits:", subreddits)
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <PostBox/>

      <div className="flex-1 flex">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {/* List subreddit */}
            <div>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow topic={subreddit.topic} index={i} key={subreddit.id}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
