import { Notifications, BorderColor, Home } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import NoticeContent from '../components/Menu/MenuAppContent/NoticeContent';

const menuAppItemList: {
  id: string;
  name: string;
  SvgIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  to: string;
  Component: (() => JSX.Element) | null;
}[] = [
  {
    id: 'mainApp',
    name: '메인',
    SvgIcon: Home,
    to: '/',
    Component: null,
  },
  {
    id: 'noticeApp',
    name: '알림',
    SvgIcon: Notifications,
    to: 'null',
    Component: NoticeContent,
  },
  {
    id: 'editorApp',
    name: '에디터',
    SvgIcon: BorderColor,
    to: '/editor',
    Component: null,
  },
];

export default menuAppItemList;
