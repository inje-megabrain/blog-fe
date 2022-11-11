import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

function Signup() {
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleAgree = (event: any) => {
    setChecked(event.target.checked);
  };

  const onhandlePost = async (data: any) => {
    const { email, name, password } = data;
    const postData = { email, name, password };

    // post
    await axios
      .post('/member/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        //history.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleSSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const joinData: any = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
    };
    const { email, name, password, rePassword } = joinData;
  };

  const schema = Yup.object().shape({
    // 이메일 유효성 체크
    email: Yup.string()
      .email('이메일 형식이 맞지 않습니다')
      .required('이메일을 입력해주세요'),

    // 비밀번호 유효성 체크
    password: Yup.string()
      .required('8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요')
      .min(8, '8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요')
      .max(16, '8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        '8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요',
      ),
    // 비밀번호 같은지 체크
    passwordcheck: Yup.string()
      .required('비밀번호 확인은 필수입니다')
      .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다'),

    // 이름 유효성 검사
    name: Yup.string().required('이름을 입력해주세요'),
    username: Yup.string()
      .required('올바른 아이디를 입력해주세요')
      .min(5, '아이디는 최소 5자로 입력해주세요')
      .max(12, '아이디는 최대 12자로 입력해주세요'),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" onSubmit={handleSSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="email"
                  id="email"
                  label="이메일 주소"
                  variant="standard"
                  error={emailError !== '' || false}
                  {...register('email')}
                />
                <h5 style={{ color: 'hotpink' }}>
                  {errors.email?.message?.toString()}
                </h5>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  variant="standard"
                  error={passwordState !== '' || false}
                  {...register('password')}
                />
                <h5 style={{ color: 'hotpink' }}>
                  {errors.password?.message?.toString()}
                </h5>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="passwordcheck"
                  label="비밀번호 재입력"
                  variant="standard"
                  error={passwordError !== '' || false}
                  {...register('passwordcheck')}
                />
                <h5 style={{ color: 'hotpink' }}>
                  {errors.passwordcheck?.message?.toString()}
                </h5>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  variant="standard"
                  error={nameError !== '' || false}
                  {...register('name')}
                />
                <h5 style={{ color: 'hotpink' }}>
                  {errors.name?.message?.toString()}
                </h5>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              회원가입
            </Button>
          </FormControl>
          <h4>{registerError}</h4>
        </Box>
      </Box>
    </Container>
  );
}
export default Signup;
