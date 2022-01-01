import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function UsersList({ users }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
         {users.map((user, i) => 
          <React.Fragment key={user.id}>
              <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={user.firstName} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={`${user.firstName} ${user.lastName}`}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Work @{user.workAt}
                </Typography>
                <span> as </span>{user.designation}
              </React.Fragment>
            }
          />
        </ListItem>
        {(i + 1 !== users.length) && <Divider variant="inset" component="li" />}
          </React.Fragment>   
         )}
      </List>
    )
}
