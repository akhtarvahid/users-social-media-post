import React, { useEffect, useState } from "react";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  USERS,
} from "./grahpql/user-queries";
import UsersList from "./components/usersList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UserForm from "./components/userForm";
import { Divider } from "@mui/material";
import Loader from "./components/Loader";
import Text from "./components/common/Text";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserExist from "./components/UserExist";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/user-profile/UserProfile";
import Header from "./components/common/Header";

const initialState = {
  firstName: "",
  lastName: "",
  locatedAt: "",
  email: "",
  workAt: "",
  designation: "",
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  workAt: string;
  locatedAt: string;
  designation: string;
}

function App() {
  const [isFilled, setIsFilled] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    errMsg: "",
    existingUser: {
      id: '',
      firstName: '',
      lastName: '',
      email: ''
    },
  });

  const [updateUserId, setUpdateUserId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState(initialState);

  const {
    loading,
    error,
    data,
    refetch: refetchUsers,
    networkStatus,
  } = useQuery(USERS, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: USERS }],
  });
  const [updateUser, { loading: updateUserLoading }] = useMutation(UPDATE_USER);

  useEffect(() => {
    const fields = Object.values(userInput).filter((usr) => usr !== "");
    if (fields.length === 6 && fields.every((usr) => usr !== "")) {
      setIsFilled(false);
      if (createUserLoading || updateUserLoading) {
        setUserInput(initialState);
        setIsFilled(true);
        refetchUsers();
      }
    }
  }, [userInput, createUserLoading, updateUserLoading, refetchUsers]);

  const getSingleUser = (userId: string) =>
    data?.users?.find((user: any) => user?.id === userId);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (updateUserId === null) {
      try {
        await createUser({
          variables: {
            createUserData: userInput,
          },
        });
        refetchUsers();
      } catch (err: any) {
        const existingUser = data?.users.find(
          (user: User) => user?.email === userInput.email
        );
        setErrors({
          ...errors,
          errMsg: err?.message,
          existingUser,
        });
      }
    } else {
      try {
        const getUser = getSingleUser(updateUserId);
        const { firstName, lastName, workAt, locatedAt, designation } =
          userInput;
        await updateUser({
          variables: {
            id: getUser.id,
            updateUserInput: {
              firstName,
              lastName,
              workAt,
              locatedAt,
              designation,
            },
          },
        });
        setUpdateUserId(null);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleDelete = async (selectedId: string) => {
    setSelected(selectedId);
    setTimeout(async () => {
      await deleteUser({
        variables: {
          id: selectedId,
        },
      });
    }, 1000);
    refetchUsers();
  };

  const handleEdit = async (selectedId: string) => {
    const { firstName, lastName, email, workAt, locatedAt, designation } =
      getSingleUser(selectedId);
    setUserInput({
      firstName,
      lastName,
      locatedAt,
      email,
      workAt,
      designation,
    });
    setIsFilled(false);
    setUpdateUserId(selectedId);
  };

  if (error) {
    return <h1>Oops, Something went wrong!</h1>;
  }

  if (networkStatus === NetworkStatus.refetch) return "fetching again!";

  if (createUserLoading || updateUserLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Loader />
      </Box>
    );
  }

  const renderApp = () => {
    return (
      <>
        <Divider>
          <AddCircleIcon color="success" />
        </Divider>
        <Grid container spacing={2} padding="20px">
          <Grid
            item
            xs={12}
            md={8}
            display={createUserLoading ? "flex" : "block"}
            justifyContent="center"
          >
            {createUserLoading ? (
              <Loader />
            ) : (
              <UserForm
                user={userInput}
                handleInput={handleInput}
                isFilled={isFilled}
                handleSubmit={handleSubmit}
                updateUserId={updateUserId}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Text content="Users list" component="h3" />
            {loading ? (
              <Loader />
            ) : (
              <UsersList
                selected={selected}
                users={data?.users}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
          </Grid>
        </Grid>
        {errors.errMsg && <UserExist errors={errors} />}
      </>
    );
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={renderApp()} />
        <Route path="/:id" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
