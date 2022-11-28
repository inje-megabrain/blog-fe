/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Blogcard from '../../components/Blogcard/Blogcard';
import { css } from '@emotion/react';

const Home = () => {
  const [number, setnumber] = useState(0);
  const trendcard = () => {
    setnumber(0);
  };
  const latestcard = () => {
    setnumber(7);
  };
  const navigate = useNavigate();
  const homeclick = () => {
    navigate('/Home');
  };

  const gridstyle = css`
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 5%;
  `;
  const title = css`
    margin-bottom: 5%;
  `;

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar color="inherit" position="static" sx={{ boxShadow: 'none' }}>
            <Toolbar>
              <Typography
                variant="h4"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={homeclick}
              >
                AllWrite
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button color="inherit">Sign in</Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: '20px', fontSize: 10, m: 1, p: 1 }}
                >
                  Get started
                </Button>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div css={gridstyle}>
        <Stack direction="column" spacing={'5%'}>
          <div css={title}>
            <h2>MEGABRAIN BLOG</h2>
            Welcome to blog, You could be the best blogger!
          </div>
        </Stack>
        <Stack direction="row" spacing={'5%'} justifyContent="space-between">
          <Button color="inherit" onClick={trendcard}>
            TRENDING
          </Button>
          <Button color="inherit" onClick={latestcard}>
            LATEST
          </Button>
          <Button color="inherit">React</Button>
          <Button color="inherit">Spring</Button>
          <Button color="inherit">Kurbernetes</Button>
          <Button color="inherit">SSO</Button>
          <TextField
            required
            id="Search"
            label=""
            defaultValue=""
            size="small"
            sx={{ width: '120px' }}
          />
        </Stack>
      </div>
      {/* <Blogcard cardnumber={number} /> */}
    </>
  );
};

export default Home;
