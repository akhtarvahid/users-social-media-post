import { gql } from "@apollo/client";

const usersFragment = gql`
  fragment UserTypeFragment on UserType {
    id
    firstName
    lastName
    locatedAt
    email
    workAt
    designation
}`;

export const USERS = gql`
  query users {
   users {
     ...UserTypeFragment
   }
 }
  ${usersFragment}
`;

export const USER = gql`
  query user($id: String!) {
   user(userId: $id) {
     ...UserTypeFragment
     userPosts {
       id
       title
       createdAt
     }
   }
 }
  ${usersFragment}
`;

export const CREATE_USER = gql`
   mutation CreateUser($createUserData: CreateUserInput!) {
    createUser(createUserData: $createUserData) {
       ...UserTypeFragment
    }
 }
  ${usersFragment}
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!){
  deleteUser(id: $id) {
    message
  }
}
`;

export const UPDATE_USER = gql`
 mutation UpdateUser($id: String!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
    ...UserTypeFragment
  }
}
  ${usersFragment}
`;

export const POSTS = gql`
 query getPosts {
  getPosts {
    id
    userId
    users {
      id
      firstName
      lastName
      email
      locatedAt
      workAt
      designation
    }
    title
    votes
    createdAt
  }
}
`;