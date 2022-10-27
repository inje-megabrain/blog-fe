import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const ProfileStyle = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`;
const imgStyle = {
  width: '200px',
  height: '200px',
  margin: 'auto 45px',
};

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  bgcolor: 'background.paper',
  border: '0px solid #000000',
  boxShadow: 20,
  borderRadius: '40px',
  padding: '40px',
};

function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ProfileStyle>
      <Button className="btn" onClick={handleOpen}>
        Open Profile
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="box" sx={boxStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              narinn-star's Profile
            </Typography>
            <img src="src\assets\Cookie_Monster.png" style={imgStyle}></img>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Introduce YourSelf in this box.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </ProfileStyle>
  );
}

export default Profile;
