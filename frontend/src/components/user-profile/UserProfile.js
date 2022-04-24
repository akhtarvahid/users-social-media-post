import React from 'react'
import { useQuery } from '@apollo/client'
import { Avatar, Button, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { USER } from '../../grahpql/users';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Text from '../common/Text';
import Loader from '../Loader';
import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
 
    const { loading, error, data } = useQuery(USER, {
        fetchPolicy: 'no-cache',
        variables: {
            id
        },
        skip: !id
      });
      console.log(data);

    if(loading) return <Loader />
    if(error) return <h1>Something went wrong...</h1>

    const posts = data?.user?.userPosts;


    return (
      <>
      <Button style={{ marginTop: '10px' }} variant="outlined" onClick={() => navigate('/')}>Back</Button>
      <Divider style={{ backgroundColor: '#005a53', margin: '20px 0px' }} />
      <Grid container spacing={6}>
       <Grid item xs={12} md={4}>
         <Item> 
          <Card sx={{ minWidth: 275, height: '100vh'}}>
          <CardContent>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 0 20px' }} color="text.secondary">
              <Avatar style={{ backgroundColor: '#005a53', height: 60, width: 60 }} alt={data.user.firstName} src="/static/images/avatar/3.jpg" />
            </Grid>
            <Typography variant="h5" component="div">
              {data.user.firstName} {data.user.lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data.user.email}
            </Typography>
            <Typography variant="body2">
              Work <strong>At</strong>{data.user.workAt}
              <br />
            </Typography>
            <Typography variant="body2">
              Designation: <strong>{data.user.workAt}</strong>
              <br />
            </Typography>
            <Typography variant="body2">
              Located<strong> In </strong>{data.user.locatedAt}
              <br />
            </Typography>
          </CardContent>
          <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <Text content='Created total posts:' component='div'  />
           <Text content={data.user?.userPosts?.length} component='div' style={{ fontWeight: 700, fontSize: '20px' }} />
          </Grid>
          </Card>
         </Item>
       </Grid>
       <Grid item xs={12} md={8}>
       <Item>
        <Grid xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          id="outlined-textarea"
          label="Create your post"
          placeholder="Write to create your post"
          multiline
          fullWidth
        />
        <Button style={{ margin: '0 0 0 20px' }} size="large" variant="contained" onClick={() => console.log('Create post click')}>Post</Button>
        </Grid>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0px 0px 10px' }}>
         {posts?.length > 0 ? posts?.map((post, i) => 
          <React.Fragment key={post.id}>
          <ListItem alignItems="center" 
            style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/${post.id}`)}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#1976d2'}} alt={post.title} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <Text content={post.title} component='div'/>
          </ListItem>
          {(i + 1 !== posts?.length) && <Divider variant="inset" component="li" />}
            </React.Fragment>   
          ):
          <Text content='Records not found!' component='p' />
          }
      </List>
       </Item>
      </Grid>
     </Grid>
     </>
    )
}
