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
        getUsers {
            created_at
            id
            username
            posts {
            title
            body
            }
            followers {
            username
        }
    }
}
`

export const GET_ALL_USERS_WITH_LIMIT = gql`
    query MyQuery($limit: Int!){
        getUserWithLimit(limit: $limit) {
            created_at
            id
            username
            posts {
            title
            body
            }
            followers {
            username
            }
        }
    }
`

export const GET_FOLLOWER_ID = gql`
    query MyQuery($username: String!){
        getFollowerId(username: $username) {
            following_id
        }
    }
`

export const GET_POST_WITH_USER = gql`
    query MyQuery($id: ID!){
        getPostWithUser(id: $id) {
            created_at
            id
            username
            posts {
                title
                body
            }
        }
    }
`

export const GET_ALL_USERS_BY_SEARCH = gql`
    query MyQuery($search: String!){
        getUsersBySearch(search: $search){
            id
            username
            created_at
        }
    }
`

export const GET_POST_BY_USERNAME = gql`
    query MyQuery($username: String!){
        getPostByUsername(username: $username){
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

export const SEARCH_USERNAME = gql`
    query MyQuery($username: String!){
        searchUsername(username: $username){
            id
            username
            created_at
        }
    }
`

export const GET_ID_BY_USERNAME = gql`
    query MyQuery($username: String!){
        getIdByUsername(username: $username){
            id
        }
    }
`

export const GET_USER_BY_ID = gql`
    query MyQuery($id: ID!){
        getUserById(id: $id){
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

export const GET_FOLLOW_BY_USERNAME_AND_ID = gql`
    query MyQuery($username: String!, $id: ID!){
        getFollowByUsernameAndId(username: $username, id: $id) {

            follow
        }
    }
`

export const GET_FOLLOWING_BY_USERNAME = gql`
    query MyQuery($username: String!){
        getFollowing(username: $username) {
            id
            username
            created_at
            following_id
        }
    }
`

export const GET_ALL_FOLLOWERS = gql`
    query MyQuery($following_id: ID!){
        getFollowers(following_id: $following_id) {
            id
            username
            created_at
            following_id
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
            usernameID
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

export const GET_MARK = gql`
    query MyQuery($username: String!, $post_id: ID!){
        getMark(username: $username, post_id: $post_id) {
            created_at
            id
            post_id
            username
            usernameID
        }
    }
`

export const GET_MARK_BY_ID = gql`
    query MyQuery($id: ID!){
        getMarkById(id: $id) {
            created_at
            id
            post_id
            username
            usernameID
            posts {
            body
            title
            comments {
                created_at
                id
                post_id
                text
                username
            }
            created_at
            id
            image
            subreddit {
                created_at
                id
                topic
            }
            subreddit_id
            username
            usernameID
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
            }
        }
    }
`

export const GET_MARKS_BY_POST_ID = gql`
    query MyQuery($post_id: ID!){
        getMarksByPostId(post_id: $post_id) {
            id
        }
    }
`