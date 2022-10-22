import { FC } from 'react';
import ListViewItem from './ListViewItem';
import { Page } from './pageTypes';

interface IListView {
  pages: Page[];
}

const ListView: FC<IListView> = ({ pages }) => {
  return (
    <div>
      {pages.map((page) =>
        page.items.map((item) => <ListViewItem key={item.id} item={item} />),
      )}
    </div>
  );
};

export default ListView;
