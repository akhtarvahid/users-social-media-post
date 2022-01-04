import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

function UserForm({ 
  user, 
  handleInput, 
  isFilled, 
  handleSubmit 
}) {
   const { firstName, lastName, workAt, designation } = user; 
   return (
       <Box
         sx={{
          maxWidth: '100%',
          px: 1        
         }}
         >
           <FormControl fullWidth>
             <TextField margin='dense' label="First Name" name="firstName" onChange={handleInput} value={firstName} />
             <TextField margin='dense' label="Last Name" name="lastName" onChange={handleInput} value={lastName} />
             <TextField margin='dense' label="Work at" name="workAt" onChange={handleInput} value={workAt} />
             <TextField margin='dense' label="Designation" name="designation" onChange={handleInput} value={designation} />
             <Button style={{ marginTop: '10px' }} variant="contained" disabled={isFilled} onClick={handleSubmit}>Submit</Button>
           </FormControl>
       </Box>
    )
}
export default UserForm;