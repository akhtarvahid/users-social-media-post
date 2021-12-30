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