import {gql} from "@apollo/client"

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic   
            created_at
        }
    }
`


export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic: String!) {
        insertReddit(topic: $topic) {
            id
            topic
            created_at
        }
    }
`