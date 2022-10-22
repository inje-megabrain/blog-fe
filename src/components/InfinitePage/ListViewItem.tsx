import { FC } from 'react';
import { PageItem } from './pageTypes';

interface IListViewItem {
  item: PageItem;
}

const ListViewItem: FC<IListViewItem> = ({ item }) => {
  return (
    <div>
      Name - {item.name} &nbsp; Full - {item.full_name}
    </div>
  );
};

export default ListViewItem;
