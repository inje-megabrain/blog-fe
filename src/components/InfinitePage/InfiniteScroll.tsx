import React, { useEffect } from 'react';
import useInfinitePage, { Operator } from '../../hooks/useInfinitePage';
import debounce from './debounce';
import { isBottomPosIn } from './ScrollUtility';
import { useWindowEvent } from '../../hooks/useWindowEvent';
import duplicatedPlugin from './duplicatedPlugin';
import { Page, PageItem } from './pageTypes';
import ListView from './ListView';

//#region Interface & Impl
interface Bundle {
  per: number;
}

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

//#region Plugin
const duplicateDetecter = duplicatedPlugin<Page, PageItem>(
  {
    getItemsFromPage(page) {
      return page.items;
    },
    setItemsInPage(page, items) {
      page.items = items;
    },
    isEqual(lhs, rhs) {
      return lhs.id === rhs.id;
    },
  },
  (numOfDuplicated) => console.log(numOfDuplicated),
);
//#endregion

const InfiniteScroll = () => {
  const { pages, status, getCurrentCursor, isNext, fetchNext } =
    useInfinitePage<Page, Bundle>(operator, [duplicateDetecter], { per: 25 });
  // register Scroll Event to Window
  useWindowEvent(
    ['scroll'],
    debounce((_) => {
      if (isBottomPosIn(50) && isNext()) fetchNext();
    }, 100),
  );

  useEffect(() => {
    // fetch data when first time.
    fetchNext();
  }, []);

  if (status === 'loading') {
    return <>Loading...</>;
  } else {
    return <ListView pages={pages} />;
  }
};

export default InfiniteScroll;
