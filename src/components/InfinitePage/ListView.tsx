import { FC } from 'react';
import { Status } from '../../hooks/useInfinitePage';
import ListViewItem from './ListViewItem';
import { Page } from '../../types/page';
import ViewStyle from './View.module.css';
import { Stack } from '@mui/material';

interface IListView {
  pages: Page[];
  status: Status;
}

const ListView: FC<IListView> = ({ pages, status }) => {
  return (
    <div>
      <Stack>
        {pages.map((page) =>
          page.items.map((item) => <ListViewItem key={item.id} item={item} />),
        )}
      </Stack>
      <div className={ViewStyle.footer}>
        {status === 'loading' && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default ListView;
