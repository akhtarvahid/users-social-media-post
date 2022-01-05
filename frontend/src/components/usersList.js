import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Text from './common/Text';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsersList({ users, handleDelete }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
         {users?.length > 0 ? users.map((user, i) => 
          <React.Fragment key={user.id}>
          <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={user.firstName} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <span style={{ fontWeight: 600 }}>
               {`${(user.firstName?.length > 10 || user.lastName?.length > 10) 
                ? user.firstName 
                : `${user.firstName} ${user.lastName}`}`
               }
              </span>}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Work <span style={{ fontWeight: 700 }}>@</span>{user.workAt}
                </Typography>
                <span> as </span>{user.designation}
              </React.Fragment>
            }
          />
          <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => handleDelete(user.id)} />
        </ListItem>
        {(i + 1 !== users.length) && <Divider variant="inset" component="li" />}
          </React.Fragment>   
         ):
         <Text content='Records not found!' component='p' />
         }
      </List>
    )
}
