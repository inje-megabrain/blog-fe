//import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
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
          <CreateIcon />
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
