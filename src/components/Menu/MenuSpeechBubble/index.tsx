import { Box, css, Popper } from '@mui/material';
import { Direction } from '../../../types/menu';

type Props = {
  direction: Direction;
  children: any;
  id: string;
  anchorEl: HTMLElement | null;
};

function borderWithDir(direction: Direction, color: string, pixel: number) {
  let border = `border: ${pixel}px solid;`;
  let borderColor = '';
  switch (direction) {
    case 'bottom':
      borderColor = `border-color: transparent  transparent ${color} transparent`;
      break;
    case 'top':
      borderColor = `border-color: ${color} transparent transparent transparent`;
      break;
    case 'left':
      borderColor = `border-color: transparent transparent transparent ${color}`;
      break;
    case 'right':
      borderColor = `border-color: transparent ${color} transparent transparent`;
      break;
  }
  return border + borderColor;
}

function positionWithDirection(direction: Direction, delta: number) {
  switch (direction) {
    case 'bottom':
      return `bottom: calc(100% - ${delta}px); left: 50%; transform: translateX(-50%)`;
    case 'top':
      return `top: calc(100% - ${delta}px); left: 50%; transform: translateX(-50%)`;
    case 'left':
      return `top: 50%; left: calc(100% - ${delta}px); transform: translateY(-50%)`;
    case 'right':
      return `top: 50%; right: calc(100% - ${delta}px); transform: translateY(-50%)`;
  }
}

function getStyle(direction: Direction) {
  return css`
    position: relative;
    padding: 10px;

    &:before,
    &:after {
      position: absolute;
      content: '';
      width: 0px;
      height: 0px;
      ${positionWithDirection(direction, 10 + 1)};
    }

    &:before {
      ${borderWithDir(direction, '#ddd', 15)};
    }
    &:after {
      ${borderWithDir(direction, '#fff', 13)};
    }
  `;
}

const MenuSpeechBubble = ({ direction, children, anchorEl, id }: Props) => {
  return (
    <Popper
      css={direction != 'none' && getStyle(direction)}
      placement={direction === 'none' ? 'bottom' : direction}
      id={id}
      open={anchorEl !== null}
      anchorEl={anchorEl}
    >
      {children}
    </Popper>
  );
};

export default MenuSpeechBubble;
