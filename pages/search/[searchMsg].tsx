import React from 'react'
import {useRouter} from "next/router"
import {useQuery } from "@apollo/client"
import {GET_ALL_POST_WITH_SEARCH} from "../../graphql/queries"

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

    return (
        <div>
            <div>{router.query.searchMsg}</div>
        </div>
        
    )
}

export default searchMsg