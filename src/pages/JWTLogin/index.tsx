import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import API_URL from '../../constants/Constants';
import { setCookie, getCookie } from '../../utils/cookie';
import { AccessToken } from '../../states/AccessToken';
import { useRecoilState } from 'recoil';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const jwtLogin = () => {
  const [token, setToken] = useRecoilState<string>(AccessToken);
  const onLogin = () => {
    console.log('jwt check');
    axios
      .post(API_URL + '/login', null, {
        params: {
          id: 'mega',
          password: 'mega123!@#',
        },
        headers: headerConfig,
      })
      .then(function (response) {
        const refreshToken = response.data.response.refresh_token;
        setToken(response.data.response.access_token);
        setCookie('refreshtoken', refreshToken);
        return response.data.response.refresh_token;
      })
      .catch((error) => {
        console.log(error);
        return '아이디 혹은 비밀번호를 확인하세요';
      });
  };

  useEffect(() => {
    console.log(token);
  }, [setToken]);

  const cookiecheck = () => {
    setCookie('cookietest', 'cookievalue');
    console.log(getCookie('cookietest'));
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
          cookiecheck();
        }}
      >
        Cookie check
      </Button>
    </Container>
  );
};
export default jwtLogin;
