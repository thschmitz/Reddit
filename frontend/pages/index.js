import Head from 'next/head';
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import { withSession } from "../src/auth/session";

export const getServerSideProps = withSession((ctx) => {
  const data = ctx.req.session;
  console.log("Data: ", data)
  return {
    props: {
      data,
    }
  }
})

const Home = (props) => {


  const session = props.data.usuarioInfo

  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <link href="https://www.redditstatic.com/icon.png"></link>
        <title>Reddit</title>
      </Head>

      <PostBox/>

      <div className="flex-1">
        <Feed/>

      </div>
    </div>
  )
}

export default Home
