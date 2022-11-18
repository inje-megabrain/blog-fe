import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import ProfileStyle from './Profile.module.css';
import SidebarStyle from './Sidebar.module.css';
import FadeModal from './FadeModal';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import { useRecoilState } from 'recoil';
import { inputState } from '../../states/profileEditState';
import useProfileHandle from '../../hooks/useProfileHandle';

// import { IconButton } from "@mui/material";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";

function Profile() {
  const { isOpen, toggle } = useModal();
  const { profile, handle } = useProfileHandle();

  const [follow, setFollow]: any = useState('FOLLOW');
  const toggleFollow = () =>
    setFollow((prev: string) => (prev === 'FOLLOW' ? 'FOLLOWING' : 'FOLLOW'));

  return (
    <div className={ProfileStyle.profileStyle}>
      <div className={SidebarStyle.sidebarStyle}>
        <Box className={SidebarStyle.boxStyle}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <h3>narinn-star</h3>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                className={SidebarStyle.img}
                // className={SidebarStyle.imgStyle}
                // src="src\assets\Cookie_Monster.png"
                // alt="PROFILE IMAGE"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button sx={{ fontSize: '10px', height: '5px' }} onClick={toggle}>
                Details
              </Button>
            </Grid>
            <Grid item xs={1.5} />
            <Grid item xs={10}></Grid>
            <Grid item xs={12} sx={{ mt: 2, ml: 1 }}></Grid>
          </Grid>
        </Box>
      </div>
      {/* Modal */}
      <FadeModal open={isOpen} handleClose={toggle}>
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
                {profile?.info}
              </Typography>
            </Grid>
            {/* Edit Link */}
            <Grid item className={ProfileStyle.modify} xs={12}>
              <Link to="/ProfileEdit" style={{ color: 'black' }}>
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
