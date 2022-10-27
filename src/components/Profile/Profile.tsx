import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfileStyle from './Profile.module.css';
import FadeModal from './FadeModal';

function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={ProfileStyle.profileStyle}>
      <Button className="btn" onClick={handleOpen}>
        Open Profile
      </Button>
      <FadeModal open={open} handleClose={handleClose}>
        <Box className={ProfileStyle.boxStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            narinn-star's Profile
          </Typography>
          <img
            src="src\assets\Cookie_Monster.png"
            className={ProfileStyle.imgStyle}
            alt="PROFILE IMAGE"
          ></img>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Introduce YourSelf in this box.
          </Typography>
        </Box>
      </FadeModal>
    </div>
  );
}

export default Profile;
