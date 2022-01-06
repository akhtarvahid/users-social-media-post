import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, DELETE_USER, USERS } from './grahpql/users';
import UsersList from './components/usersList';
import Grid from '@mui/material/Grid';
import UserForm from './components/userForm';
import { Divider } from '@mui/material';
import Loader from './components/Loader';
import Text from './components/common/Text';

function App() {
  const [isFilled, setIsFilled] = useState(true);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    workAt: '',
    designation: ''
  });

  const { data, loading, refetch: refetchUsers } = useQuery(USERS, {
    fetchPolicy: "network-only"
  });
  const [createUser, {loading: createUserLoading}] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER, { refetchQueries: [{ query: USERS }], });

  useEffect(() => {
     const fields = Object.values(user).filter(usr => usr!=='');
     if(fields.length === 4 && fields.every(usr => usr!=='')) {
        setIsFilled(false);
        if(createUserLoading) {
          setUser({
          firstName: '',
          lastName: '',
          workAt: '',
          designation: ''
        })
        setIsFilled(true);
        refetchUsers();
      }
     }
  }, [user, createUserLoading, refetchUsers])

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
  const handleDelete = async (selectedId) => {
    setSelected(selectedId)
    setTimeout(async () => {
      await deleteUser({
        variables: {
          id: selectedId
        }
      });
    }, 1000);
    refetchUsers();
  }

  return (
    <>
      <Grid container bgcolor='#13D1C0' color='#fff' padding='30px 0px 30px 30px' marginBottom='30px'>
        <Text content='Users social media post' component='h1' />
      </Grid>
      <Divider>
        <Text content='Create Users' component='h3' />
      </Divider>
      <Grid container spacing={2} padding='20px'>
       <Grid item xs={12} md={8} display={createUserLoading ? 'flex' : 'block'} justifyContent='center'>
        {createUserLoading ? <Loader /> :  <UserForm user={user} handleInput={handleInput} isFilled={isFilled} handleSubmit={handleSubmit} />}
       </Grid>
       <Grid item xs={12} md={4}>
        <Text content='Users list' component='h3' />
        {loading ? <Loader /> : <UsersList deletedSpinner selected={selected} users={data.users} handleDelete={handleDelete} />}
       </Grid>
      </Grid>
    </>
  );
}

export default App;
