import { gql } from "@apollo/client";


export const USERS = gql`
  query users {
   users {
     lastName
     firstName
     id
     workAt
     designation
   }
  }
`;

export const CREATE_USER = gql`
   mutation CreateUser($createUserData: CreateUserInput!) {
    createUser(createUserData: $createUserData) {
       id
       lastName
       firstName
       workAt
       designation
    }
   }
`