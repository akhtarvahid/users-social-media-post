import { Grid } from '@mui/material'
import React from 'react'
import Text from './Text'

export default function Header() {
    return (
        <Grid container bgcolor='#005a53' color='#fff' padding='30px 0px 30px 30px' marginBottom='30px'>
        <Text content='Users social media post' component='h1' />
      </Grid>
    )
}
