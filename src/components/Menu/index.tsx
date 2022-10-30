import AppsIcon from '@mui/icons-material/Apps';
import { Badge, ClickAwayListener, IconButton, Popper } from '@mui/material';
import React, { useState } from 'react';
import MenuContainer from '../MenuContainer';

type Props = {
  size?: number;
  id: string;
};

const Menu = ({ size = 33, id }: Props) => {
  const [notice, setNotice] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(anchorEl ? null : e.currentTarget);

  const handleClickAway = () => setAnchorEl(null);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton
          aria-describedby={id}
          aria-label="menu"
          onClick={handleClick}
        >
          <Badge badgeContent={notice} color="primary">
            <AppsIcon sx={{ fontSize: size }} />
          </Badge>
        </IconButton>
        <Popper id={id} open={anchorEl !== null} anchorEl={anchorEl}>
          <MenuContainer setNotice={setNotice} />
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default Menu;
