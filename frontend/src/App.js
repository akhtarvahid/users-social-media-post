import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, DELETE_USER, UPDATE_USER, USERS } from './grahpql/users';
import UsersList from './components/usersList';
import Grid from '@mui/material/Grid';
import UserForm from './components/userForm';
import { Divider } from '@mui/material';
import Loader from './components/Loader';
import Text from './components/common/Text';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserExist from './components/UserExist';

function App() {
  const [isFilled, setIsFilled] = useState(true);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({
    errMsg: '',
    existingUser: {}
  })
  const [updateUserId, setUpdateUserId] = useState(null);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    workAt: '',
    designation: ''
  });

  const { loading, error, data, refetch: refetchUsers } = useQuery(USERS, {
    fetchPolicy: "network-only",
  });
  const [createUser, {loading: createUserLoading}] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER, { refetchQueries: [{ query: USERS }], });
  const [updateUser, {loading: updateUserLoading}] = useMutation(UPDATE_USER);

  useEffect(() => {
     const fields = Object.values(userInput).filter(usr => usr!=='');
     if(fields.length === 5 && fields.every(usr => usr!=='')) {
        setIsFilled(false);
        if(createUserLoading || updateUserLoading) {
          setUserInput({
          firstName: '',
          lastName: '',
          email: '',
          workAt: '',
          designation: ''
        })
        setIsFilled(true);
        refetchUsers();
      }
     }
  }, [userInput, 
    createUserLoading, 
    updateUserLoading, 
    refetchUsers]
)

  const getSingleUser = (userId) => data?.users.find(({ id }) => id === userId)

  const handleInput = (e) => {
     const { name, value } = e.target;
     setUserInput({
       ...userInput,
       [name]: value
     })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  if(updateUserId===null) {
     try {
      await createUser({  
        variables: {
          createUserData: userInput
        }
      });
     } catch(err) {
       const existingUser = data?.users.find(({ email }) => email === userInput.email);
       setErrors({
         ...errors,
         errMsg: err.message,
         existingUser
       })
     }
   } else {
       try {
        const getUser = getSingleUser(updateUserId);
        await updateUser({
         variables: {
           id: getUser.id,
           updateUserInput: userInput
         }
        });
       } catch(err) {
         console.log(err);
       }
   }
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
  const handleEdit = async (selectedId) => {
    const { firstName, lastName, email, workAt, designation } = getSingleUser(selectedId);
    setUserInput({
      firstName,
      lastName,
      email,
      workAt,
      designation
    })
    setIsFilled(false);
    setUpdateUserId(selectedId);
  }
  if(error) {
    return <h1>Something went wrong</h1>
  }
  return (
    <>
      <Grid container bgcolor='#005a53' color='#fff' padding='30px 0px 30px 30px' marginBottom='30px'>
        <Text content='Users social media post' component='h1' />
      </Grid>
      <Divider>
        <Text content='Create Users' component='h3' />
        <AddCircleIcon color='success' />
      </Divider>
      <Grid container spacing={2} padding='20px'>
       <Grid item xs={12} md={8} display={createUserLoading ? 'flex' : 'block'} justifyContent='center'>
        {createUserLoading ? <Loader /> :  <UserForm user={userInput} handleInput={handleInput} isFilled={isFilled} handleSubmit={handleSubmit} />}
       </Grid>
       <Grid item xs={12} md={4}>
        <Text content='Users list' component='h3' />
        {loading ? <Loader /> : <UsersList deletedSpinner selected={selected} users={data?.users} handleDelete={handleDelete} handleEdit={handleEdit}/>}
       </Grid>
      </Grid>
      {errors.errMsg && <UserExist errors={errors} />}
    </>
  );
}

export default App;
