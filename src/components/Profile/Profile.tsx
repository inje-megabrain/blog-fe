import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfileStyle from './Profile.module.css';
import FadeModal from './FadeModal';
import { Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={ProfileStyle.profileStyle}>
      <Button className={ProfileStyle.btnStyle} onClick={handleOpen}>
        Open Profile
      </Button>
      <FadeModal open={open} handleClose={handleClose}>
        <Box className={ProfileStyle.boxStyle}>
          <Typography
            className={ProfileStyle.titleStyle}
            variant="h6"
            sx={{ mt: 0, mb: 2 }}
          >
            narinn-star's Profile Box
          </Typography>
          <Grid container>
            <Grid item xs={4.5}>
              <Box
                className={ProfileStyle.imgStyle}
                sx={{ backgroundColor: 'yellow' }}
              />
              {/* <img
                className={ProfileStyle.imgStyle}
                src="src\assets\Cookie_Monster.png"
                alt="PROFILE IMAGE"
              ></img> */}
            </Grid>
            <Grid item xs={7.5}>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Introduce YourSelf in this box.
                <br />
                Write Anything You Want!
              </Typography>
            </Grid>
            <Grid item className={ProfileStyle.modify} xs={12}>
              수정
            </Grid>
            <Grid item className={ProfileStyle.bottomLeftStyle} xs={4}>
              여기는 머였지..
            </Grid>
            <Grid item className={ProfileStyle.bottomRightStyle} xs={8}>
              <IconButton
                aria-label="github"
                onClick={() => {
                  window.open('https://github.com/');
                }}
                sx={{ borderColor: 'none' }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="instagram"
                onClick={() => {
                  window.open('https://instagram.com/');
                }}
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="facebook"
                onClick={() => {
                  window.open('https://facebook.com/');
                }}
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="google"
                onClick={() => {
                  window.open('https://google.com/');
                }}
              >
                <GoogleIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </FadeModal>
    </div>
  );
}

export default Profile;
