import React from 'react';
import { useQuery } from "@apollo/client";
import { USERS } from './grahpql/users';



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
