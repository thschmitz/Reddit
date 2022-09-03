import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast'
import client from "../apollo-client"
import Header from "../components/Header"
import { tokenService } from "../src/auth/tokenService"
import '../styles/globals.css'

const MyApp = async ({ Component, pageProps: {session, ...pageProps} }) => {
  const access_token = tokenService.getAccessToken();

  return(
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster/>
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header props={access_token}/>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>

  )
}

export default MyApp
