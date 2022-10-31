import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import ProfileStyle from './Profile.module.css';
import FadeModal from './FadeModal';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
// import { IconButton } from "@mui/material";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";

function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [follow, setFollow]: any = useState('FOLLOW');
  const toggleFollow = () =>
    setFollow((prev: string) => (prev === 'FOLLOW' ? 'FOLLOWING' : 'FOLLOW'));

  return (
    <div className={ProfileStyle.profileStyle}>
      <Button className={ProfileStyle.btnStyle} onClick={handleOpen}>
        Open Profile
      </Button>
      {/* Modal */}
      <FadeModal open={open} handleClose={handleClose}>
        <Box className={ProfileStyle.boxStyle}>
          {/* Modal Title */}
          <Typography
            className={ProfileStyle.titleStyle}
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            narinn-star's Profile Box
          </Typography>
          <Grid container>
            {/* Profile PNG */}
            <Grid item xs={4.5}>
              <img
                className={ProfileStyle.img}
                // className={ProfileStyle.imgStyle}
                // src="src\assets\Cookie_Monster.png"
                // alt="PROFILE IMAGE"
              ></img>
            </Grid>
            {/* Contents_Introduce */}
            <Grid item xs={7.5} className={ProfileStyle.introduce}>
              <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                Introduce YourSelf in this box.
                <br />
                Write Anything You Want!
              </Typography>
            </Grid>
            {/* Edit Link */}
            <Grid item className={ProfileStyle.modify} xs={12}>
              <Link to="/profile/edit" style={{ color: 'black' }}>
                수정
              </Link>
            </Grid>
            {/* Badge Icons */}
            <Grid
              item
              className={ProfileStyle.bottomLeftStyle}
              xs={4.5}
              sx={{ mt: '20px' }}
            >
              <WorkspacePremiumIcon fontSize="large" />
              <Diversity3Icon fontSize="large" />
              <CreateIcon fontSize="large" />
            </Grid>
            {/* Buttons */}
            <Grid
              item
              className={ProfileStyle.bottomRightStyle}
              xs={7.5}
              sx={{ mt: '20px' }}
            >
              <Button
                className={ProfileStyle.btn}
                variant="contained"
                onClick={toggleFollow}
              >
                {follow}
              </Button>
              <Button className={ProfileStyle.btn}>SEND</Button>
              {/* <IconButton
                aria-label="github"
                onClick={() => {
                  window.open("https://github.com/");
                }}
                color="inherit"
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="instagram"
                onClick={() => {
                  window.open("https://instagram.com/");
                }}
                color="inherit"
              >
                <InstagramIcon fontSize="large" />
              </IconButton> */}
            </Grid>
          </Grid>
        </Box>
      </FadeModal>
    </div>
  );
}

export default Profile;
