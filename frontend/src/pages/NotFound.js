import { Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant='h1'>! 404 Not Found !</Typography>
      <Typography variant='h3'>The requested page could not be found.</Typography>
      <Typography variant='h5'>
        For Login/Signup, <Link component={RouterLink} to='/' color='primary'>Click Here</Link>
      </Typography>
    </div>
  );
};

export default NotFound;
