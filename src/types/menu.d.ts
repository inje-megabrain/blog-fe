import { FC } from 'react';

type Direction = 'top' | 'bottom' | 'right' | 'left' | 'none';

type MenuAppItemProp = {
  handleClick: () => void;
  name: string;
  icon: JSX.Element;
};

type MenuAppItemComponent = FC<MenuAppItemProp>;
