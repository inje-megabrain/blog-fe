import React from 'react';
import '../App.css';
import Grid from '@mui/material/Grid';
import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import profileimg from '../image/monkey.png';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function Blogmain() {
  const navigate = useNavigate();
  const homeclick = () => {
    navigate('/Home');
  };

  return (
    <>
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
      <div className="blogname">
        <h1>Jinseo Blog</h1>
      </div>
      <div className="grid1">
        <Grid container spacing={20}>
          <Grid item xs={4}>
            <Box
              sx={{
                width: 200,
                height: 700,
                borderRadius: '50px',
                borderStyle: 'solid',
                borderWidth: 3,
                borderColor: 'lightgrey',
              }}
            >
              <div className="boxbutton">
                <img className="profile" src={profileimg} />
                <h3>Brown Monkey</h3>
                <Stack spacing={'20%'} sx={{ marginTop: '30%' }}>
                  <Button onClick={homeclick}>집</Button>
                  <Button>알림</Button>
                  <Button>저장</Button>
                  <Button>글쓰기</Button>
                </Stack>
              </div>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Stack direction="column" spacing={'3%'}>
              <Card sx={{ borderRadius: '20px', width: '80%', height: '30%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Blog Topic
                  </Typography>
                  <Typography variant="body2">Blog Content</Typography>
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '20px', width: '80%', height: '30%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Blog Topic
                  </Typography>
                  <Typography variant="body2">Blog Content</Typography>
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '20px', width: '80%', height: '30%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Blog Topic
                  </Typography>
                  <Typography variant="body2">Blog Content</Typography>
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '20px', width: '80%', height: '30%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Blog Topic
                  </Typography>
                  <Typography variant="body2">Blog Content</Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Blogmain;
