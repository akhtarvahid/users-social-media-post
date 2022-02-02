import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom';
import { USER } from '../../grahpql/users';

export default function UserProfile() {
    const { id } = useParams();
 
    const { loading, error, data } = useQuery(USER, {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
        variables: {
            id
        },
        skip: !id
      });

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Something went wrong...</h1>

    return (
      <div>
       {JSON.stringify(data)} 
      </div>
    )
}
