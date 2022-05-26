import { gql } from "@apollo/client";

export const CREATE_POST = gql`
   mutation CreateUser($createPost: CreatePostInput!) {
    createPost(createPost: $createPost) {
      id
      userId
      title
      votes
      createdAt
    }
 }
`