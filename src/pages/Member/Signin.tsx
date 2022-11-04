import React from 'react';
//import "./style.css";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
  Typography,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import { GitHub, Google, AlternateEmail } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Signin() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 400,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <TextField
          label="Find Password"
          required
          fullWidth
          name="find password"
          autoComplete="find password"
          autoFocus
          variant="standard"
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          required
          fullWidth
          name="password"
          autoComplete="current-password"
          variant="standard"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in
        </Button>

        <Grid>
          <GitHub />
          <Google />
          <AlternateEmail />
        </Grid>

        <Grid container>
          <Grid item xs>
            <Link to="/findpw">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to="/Signup">"Sign Up"</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
