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
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
        variables: {
            id
        },
        skip: !id
      });

    if(loading) return <Loader />
    if(error) return <h1>Something went wrong...</h1>

    return (
      <>
      <Button style={{ marginTop: '10px' }} variant="outlined" onClick={() => navigate('/')}>Back</Button>
      <Divider style={{ backgroundColor: '#005a53', margin: '20px 0px' }} />
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
         <Item> 
          <Card sx={{ minWidth: 275, height: '100vh'}}>
          <CardContent>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} color="text.secondary" gutterBottom>
              <Avatar style={{ backgroundColor: '#005a53', height: 60, width: 60 }} alt={data.user.firstName} src="/static/images/avatar/3.jpg" />
            </Typography>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text content='Created total posts:' component='div'  />
          <Text content={data.user?.userPosts?.length} component='div' style={{ fontWeight: 700, fontSize: '20px' }} />
          </div>
          </Card>
         </Item>
       </Grid>
       <Grid item xs={12} md={8}>
       <Item><p>Posts</p> </Item>
      </Grid>
     </Grid>
     </>
    )
}
