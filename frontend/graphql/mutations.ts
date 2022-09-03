import { gql } from "@apollo/client"

export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $text: String!){
        insertComment(post_id: $post_id, username: $username, text:$text){
            created_at
            id
            post_id
            text
            username
        }
    }
`

export const ADD_USER = gql`
    mutation MyMutation($username: String!, $email: String!, $senha: String!, $id: ID!){
        insertUser(username: $username, email: $email, senha: $senha, id: $id){
            id
            username
            email
            senha
            created_at
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation MyMutation($id: ID!){
        deleteComment(post_id: $id){
            id
            text
            username
        }
    }
`

export const DELETE_VOTE = gql`
    mutation MyMutation($id: ID!){
        deleteVote(post_id: $id){
            id
            post_id
            username
        }
    }
`

export const INSERT_FOLLOW = gql`
    mutation MyMutation($username: String!, $following_id: ID!, $follow: Boolean!){
        insertFollow(username: $username, following_id: $following_id, follow: $follow){
            id
            username
            following_id
            created_at
            follow
        }
    }
`

export const DELETE_FOLLOW = gql`
    mutation MyMutation($username: String!, $following_id: ID!){
        deleteFollow(username: $username, following_id: $following_id){
            id
            username
            following_id
            created_at
            follow
        }
    }
`

export const DELETE_POST = gql`
    mutation MyMutation($id: ID!){
        deletePost(id: $id){
            id
            title
            body
            username
        }
    }
`

export const ADD_VOTE = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $upvote:Boolean!) {
        insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
            id
            created_at
            post_id
            upvote
            username
        }
    }
`

export const ADD_POST = gql`
    mutation MyMutation(
        $body: String!,
        $image: String!,
        $subreddit_id: ID!,
        $title: String!,
        $username: String!,
        $usernameID: ID!,
    ) {
        insertPost(
            body: $body
            image: $image
            subreddit_id: $subreddit_id
            title: $title
            username: $username
            usernameID: $usernameID
        ) {
            body
            created_at
            id
            image
            subreddit_id
            title
            username
            usernameID
        }
    }
`

export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic: String!) {
        insertSubreddit(topic: $topic) {
            id
            topic
            created_at
        }
    }
`

export const ADD_MARK = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $usernameID: ID!) {
        insertMark(post_id: $post_id, username: $username, usernameID: $usernameID) {
            id
            created_at
            post_id
            username
            usernameID
        }
    }
`

export const DELETE_MARK = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $usernameID: ID!) {
        deleteMark(post_id: $post_id, username: $username, usernameID: $usernameID) {
            id
            created_at
            post_id
            username
            usernameID
        }
    }
`