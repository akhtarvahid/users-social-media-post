import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Text from './common/Text';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from './Loader';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function UsersList({ selected, users, handleDelete, handleEdit }) {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(5);

    return (
      <>
        {<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0px 0px 10px' }}>
         {users?.length > 0 ? users?.slice(0, limit).map((user, i) => 
          <React.Fragment key={user.id}>
          {(user.id !== selected) ? 
          <ListItem alignItems="flex-start" 
            style={{ position: 'relative', cursor: 'pointer' }}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#005a53'}} alt={user.firstName} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              onClick={() => navigate(`/${user.id}`)}
              primary={
                <span style={{ fontWeight: 600, color: "#005a53" }}>
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
                    Work <strong>@</strong><span style={{ fontWeight: 700 }}>{user.workAt}</span>
                  </Typography>
                  <span> as </span>{user.designation}
                </React.Fragment>
              }
            />
           <EditIcon 
              color="success"
              style={{ cursor: 'pointer' }} 
              onClick={() => handleEdit(user.id)} 
           /> 
           <DeleteIcon 
              color="error" 
              style={{ cursor: 'pointer', position: 'absolute', right: '-30px' }} 
              onClick={() => handleDelete(user.id)} 
          />
          </ListItem> : <Loader />}
          {(i + 1 !== users?.length) && <Divider variant="inset" component="li" />}
            </React.Fragment>   
          ):
          <Text content='Records not found!' component='p' />
          }
      </List>}
      {users?.length > limit && 
       <Button size="small" onClick={() => users?.length > limit && setLimit(lim => lim + 5)}>
         Show more
       </Button>}
      </>
    )
}
