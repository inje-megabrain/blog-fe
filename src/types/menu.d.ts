import { FC } from 'react';

type MenuAppItemProp = {
  handleClick: () => void;
  name: string;
  icon: JSX.Element;
};

type MenuAppItemComponent = FC<MenuAppItemProp>;
