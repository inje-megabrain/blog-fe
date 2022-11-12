import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import API_URL from '../../constants/Constants';
import { setCookie, getCookie } from '../../utils/cookie';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const jwtLogin = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const onLogin = () => {
    console.log('jwt check');
    axios
      .post('http://api.iamport.kr/users/getToken', null, {
        params: {
          imp_key: '2572615525341412',
          imp_secret:
            'IRaiPEHjB5WrLFF12kjuPiHY4qL7QV6qW3fmFUUPqAeNsd2A7SDhbz06biyC7wCLB8VeDHmC487tepR5',
        },
        headers: headerConfig,
      })
      .then(function (response) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.response.access_token}`;
        const jwtToken = response.data.response.access_token;
        setCookie('accessJwtToken', jwtToken);
        return response.data.response.access_token;
      })
      .catch((error) => {
        console.log(error);
        return '아이디 혹은 비밀번호를 확인하세요';
      });
  };
  const getToken = () => {
    const userInfo = getCookie('accessJwtToken');
    console.log('click');
    return userInfo;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="id"
        label="ID"
        name="id"
        autoComplete="id"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        variant="contained"
        onClick={() => {
          onLogin();
        }}
      >
        Sign in
      </Button>
      <Button
        onClick={() => {
          getToken();
        }}
      >
        Cookie check
      </Button>
    </Container>
  );
};
export default jwtLogin;
