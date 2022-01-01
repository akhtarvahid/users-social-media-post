import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, USERS } from './grahpql/users';
import UsersList from './components/usersList';
import Grid from '@mui/material/Grid';
import UserForm from './components/userForm';
import { Divider } from '@mui/material';

function App() {
  const { data, loading } = useQuery(USERS);
  const [isFilled, setIsFilled] = useState(true);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    workAt: '',
    designation: ''
  });
  const [createUser, { createUserLoading }] = useMutation(CREATE_USER);

  useEffect(() => {
     const fields = Object.values(user).filter(usr => usr!=='');
     if(fields.length === 4 && fields.every(usr => usr!=='')) {
        setIsFilled(false);
     }
  }, [user])

  const handleInput = (e) => {
     const { name, value } = e.target;
     setUser({
       ...user,
       [name]: value
     })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({  
    variables: {
      createUserData: user
    }
  });
  }

  if(loading || createUserLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <Grid container bgcolor='#13D1C0' color='#fff' paddingLeft='30px' marginBottom='30px'>
        <h1>Users social media post</h1>
      </Grid>
      <Divider>Create Users</Divider>
      <Grid container spacing={2} padding='20px'>
       <Grid item xs={12} md={8}>
        <UserForm user={user} handleInput={handleInput} isFilled={isFilled} handleSubmit={handleSubmit} />
       </Grid>
       <Grid item xs={12} md={4}>
        <UsersList users={data.users} />
       </Grid>
      </Grid>
    </>
  );
}

export default App;
