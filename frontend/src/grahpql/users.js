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