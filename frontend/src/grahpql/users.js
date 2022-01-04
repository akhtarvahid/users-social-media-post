import { gql } from "@apollo/client";

const usersFragment = gql`
    fragment UserTypeFragment on UserType {
        id
        firstName
        lastName
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

export const CREATE_USER = gql`
   mutation CreateUser($createUserData: CreateUserInput!) {
    createUser(createUserData: $createUserData) {
       ...UserTypeFragment
    }
 }
  ${usersFragment}
`