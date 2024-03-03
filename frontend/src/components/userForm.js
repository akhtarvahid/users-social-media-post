import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Text from "./common/Text";

function UserForm({ user, handleInput, isFilled, handleSubmit, updateUserId }) {
  const { firstName, lastName, email, workAt, locatedAt, designation } = user;
  return (
    <Box
      sx={{
        maxWidth: "100%",
        px: 1,
      }}
    >
      <Text
        style={{ fontSize: 30, margin: "0 0 20px 0", fontWeight: 600 }}
        content="Register yourself to create your posts"
        component="div"
      />
      <FormControl fullWidth>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          onChange={handleInput}
          value={firstName}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          onChange={handleInput}
          value={lastName}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          onChange={handleInput}
          value={email}
          disabled={updateUserId !== null}
        />
        <TextField
          margin="dense"
          label="Located at"
          name="locatedAt"
          onChange={handleInput}
          value={locatedAt}
        />
        <TextField
          margin="dense"
          label="Work at"
          name="workAt"
          onChange={handleInput}
          value={workAt}
        />
        <TextField
          margin="dense"
          label="Designation"
          name="designation"
          onChange={handleInput}
          value={designation}
        />
      </FormControl>
      <Button
        style={{ marginTop: "10px", width: 200 }}
        variant="contained"
        disabled={isFilled}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}
export default UserForm;
