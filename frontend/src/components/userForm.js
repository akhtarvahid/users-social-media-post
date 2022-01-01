import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function UserForm({ user, handleInput, isFilled, handleSubmit }) {
    return (
       <Box
         sx={{
          width: 500,
          maxWidth: '100%',
         }}>
         <TextField fullWidth label="First Name" id="firstName" name="firstName" onChange={handleInput}/>
         <TextField fullWidth label="Last Name" id="lastName" name="lastName" onChange={handleInput}/>
         <TextField fullWidth label="Work at" id="Work@" name="workAt" onChange={handleInput}/>
         <TextField fullWidth label="Designation" id="designation" name="designation" onChange={handleInput}/>
         <Button variant="contained" disabled={isFilled} onClick={handleSubmit}>Submit</Button>
       </Box>
    )
}
