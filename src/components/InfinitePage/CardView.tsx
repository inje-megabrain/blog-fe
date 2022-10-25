import { FC } from 'react';
import { Status } from '../../hooks/useInfinitePage';
import { Page } from './pageTypes';
import ViewStyle from './View.module.css';
import CardViewItem from './CardViewItem';

interface ICardView {
  pages: Page[];
  status: Status;
}

const CardView: FC<ICardView> = ({ pages, status }) => {
  return (
    <div>
      <div className={ViewStyle.viewCard}>
        {pages.map((page) =>
          page.items.map((item) => <CardViewItem key={item.id} item={item} />),
        )}
      </div>
      <div className={ViewStyle.footer}>
        {status === 'loading' && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default CardView;
