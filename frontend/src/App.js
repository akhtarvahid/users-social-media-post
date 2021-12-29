import React from 'react';
import { useQuery, gql } from "@apollo/client";

const USERS = gql`
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

function App() {
  const { data, loading } = useQuery(USERS);

  if(loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h1>Users social media post</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
