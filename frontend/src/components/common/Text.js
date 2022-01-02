import { Typography } from '@mui/material'
import React from 'react'

export default function Text(props) {
    const { content, component } = props;
    return (
        <Typography variant="title" component={component} {...props}>
          {content}
        </Typography>
    )
}
