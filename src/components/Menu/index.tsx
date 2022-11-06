import { Apps, PersonSharp } from '@mui/icons-material';
import { Badge, ClickAwayListener, IconButton, Popper } from '@mui/material';
import React, { useState } from 'react';
import { Direction } from '../../types/menu';
import MenuContainer from './MenuContainer';
import MenuSpeechBubble from './MenuSpeechBubble';

type Props = {
  size?: number;
  id: string;
  direction: Direction;
};

const Menu = ({ size = 33, id, direction }: Props) => {
  const [notice, setNotice] = useState(1);
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
            <PersonSharp sx={{ fontSize: size }} />
          </Badge>
        </IconButton>
        <MenuSpeechBubble direction={direction} id={id} anchorEl={anchorEl}>
          <MenuContainer setNotice={setNotice} />
        </MenuSpeechBubble>
      </div>
    </ClickAwayListener>
  );
};

export default Menu;
