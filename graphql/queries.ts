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

export const GET_ALL_USERS = gql`
    query MyQuery{
        getUsers{
            id
            username
            created_at
        }
    }
`

export const GET_ALL_POST_WITH_SEARCH = gql `
    query MyQuery($search: String!){
        getPostBySearch(search: $search) {
            body
            created_at
            id
            image
            title
            username
            subreddit_id
            comments{
                created_at
                id
                post_id
                text
                username
            }
            votes{
                created_at
                id
                post_id
                upvote
                username
            }
            subreddit {
                created_at
                id
                topic
            }
        }
    }
`

export const GET_SUBREDDITS_WITH_LIMIT = gql`
    query MyQuery($limit: Int!) {
        getSubredditListLimit(limit: $limit) {
            id
            topic
            created_at
        }
    }
`

export const GET_ALL_VOTES_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getVotesByPostId(post_id: $post_id) {
            created_at
            username
            upvote
            post_id
            id
        }
    }
`

export const GET_ALL_POSTS_BY_POST_ID = gql`
    query MyQuery($post_id: ID!){
        getPostListByPostId(post_id: $post_id) {
            body
            created_at
            id
            image
            title
            username
            subreddit_id
            comments{
                created_at
                id
                post_id
                text
                username
            }
            votes{
                created_at
                id
                post_id
                upvote
                username
            }
            subreddit {
                created_at
                id
                topic
            }
        }
    }
`

export const GET_ALL_POSTS = gql`
    query MyQuery{
        getPostList {
            body
            created_at
            id
            image
            title
            username
            subreddit_id
            comments{
                created_at
                id
                post_id
                text
                username
            }
            votes{
                created_at
                id
                post_id
                upvote
                username
            }
            subreddit {
                created_at
                id
                topic
            }
        }
    }
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String!){
        getPostListByTopic(topic: $topic) {
            body
            created_at
            id
            image
            title
            username
            subreddit_id
            comments{
                created_at
                id
                post_id
                text
                username
            }
            votes{
                created_at
                id
                post_id
                upvote
                username
            }
            subreddit {
                created_at
                id
                topic
            }
        }
    }
`