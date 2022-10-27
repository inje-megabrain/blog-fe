import React, { useEffect } from 'react';
import useInfinitePage, { Operator } from '../../hooks/useInfinitePage';
import debounce from '../../utils/debounce';
import { isBottomPosIn } from '../../utils/scroll';
import { useWindowEvent } from '../../hooks/useWindowEvent';
import useToggleButtons from '../../hooks/useToggleButtons';
import { defaultDetector } from '../../utils/plugins/duplicated';
import { Page, Bundle } from '../../types/page';
import { ViewList, ViewModule } from '@mui/icons-material';
import ListView from './ListView';
import ViewStyle from './View.module.css';
import CardView from './CardView';

//#region Interface & Impl
// Issue #7

const operator: Operator<Page, Bundle> = {
  getNextCursor(pages, bundle) {
    const expect = pages.length + 1;
    const limit = Math.ceil(pages[pages.length - 1].total_count / bundle.per);

    return limit > expect ? expect : undefined;
  },
  async fetchNextPage(nextCursor = 1, bundle = { per: 25 }) {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:reactjs&per_page=${bundle.per}&page=${nextCursor}`,
    );

    if (response.status != 200) throw Error(await response.text());

    return (await response.json()) as Page;
  },
};
//#endregion

const InfiniteScroll = () => {
  const { pages, status, getCurrentCursor, isNext, fetchNext, clearPages } =
    useInfinitePage<Page, Bundle>(
      operator,
      [defaultDetector((n) => console.log(n))],
      { per: 25 },
    );

  const [ToggleGroup, selected] = useToggleButtons({
    list: <ViewList />,
    card: <ViewModule />,
  });

  // register Scroll Event to Window
  useWindowEvent(
    ['scroll'],
    debounce((_) => {
      if (isBottomPosIn(50) && isNext()) {
        fetchNext();
      }
    }, 100),
  );

  useEffect(() => {
    fetchNext();
    // For strict mode...
    return () => clearPages();
  }, []);

  return (
    <div className={ViewStyle.viewLayout}>
      <div className={ViewStyle.viewContent}>
        <div className={ViewStyle.viewMenu}>
          <ToggleGroup />
        </div>
        {selected === 'list' ? (
          <ListView pages={pages} status={status} />
        ) : (
          <CardView pages={pages} status={status} />
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
