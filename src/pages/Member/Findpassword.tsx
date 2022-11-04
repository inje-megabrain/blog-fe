import React from 'react';
//import "./style.css";
import TextField from '@mui/material/TextField';
//import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
//import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function App() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <TextField
          label="Password입력"
          required
          fullWidth
          name="Password 입력"
          autoComplete="Password 입력"
          autoFocus
        />
        <TextField
          margin="normal"
          label="Password 확인"
          type="password 확인"
          required
          fullWidth
          name="password 확인"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Find Password
        </Button>
      </Box>
    </Container>
  );
}
