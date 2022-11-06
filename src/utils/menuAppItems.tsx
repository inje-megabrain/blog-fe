import { Notifications, BorderColor, Home } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import NoticeContent from '../components/Menu/MenuAppContent/NoticeContent';

const menuAppItemList: {
  name: string;
  SvgIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  to: string;
  Component: (() => JSX.Element) | null;
}[] = [
  {
    name: '메인',
    SvgIcon: Home,
    to: '/',
    Component: null,
  },
  {
    name: '알림',
    SvgIcon: Notifications,
    to: 'null',
    Component: NoticeContent,
  },
  {
    name: '에디터',
    SvgIcon: BorderColor,
    to: '/editor',
    Component: null,
  },
];

export default menuAppItemList;
