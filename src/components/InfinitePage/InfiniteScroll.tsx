import React from 'react';
import useInfinitePage, { Operator, Plugin } from '../../hooks/useInfinitePage';
import debounce from './debounce';
import { isBottomPosIn } from './ScrollUtility';
import { useWindowEvent } from '../../hooks/useWindowEvent';
import duplicatedPlugin from './duplicatedPlugin';

//#region Interface & Impl
interface Page {
  total_count: number;
  items: PageItem[];
}

interface PageItem {}

interface Bundle {
  per: number;
}

const operator: Operator<Page, Bundle> = {
  getNextCursor(pages, bundle) {
    const expect = pages.length + 1;
    const limit = Math.ceil(pages[pages.length - 1].total_count / bundle.per);

    return limit > expect ? expect : undefined;
  },
  async fetchNextPage(nextCursor = 1, bundle = { per: 20 }) {
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
      return [];
    },
    setItemsInPage(page, items) {},
    isEqual(lhs, rhs) {
      return false;
    },
  },
  (numOfDuplicated) => console.log(numOfDuplicated),
);
//#endregion

const InfiniteScroll = () => {
  const { pages, getCurrentCursor, isNext, fetchNext } = useInfinitePage<
    Page,
    Bundle
  >(operator, [duplicateDetecter]);
  // register Scroll Event to Window
  useWindowEvent(
    ['scroll'],
    debounce((_) => {
      if (isBottomPosIn(50) && isNext()) fetchNext();
    }, 100),
  );

  return <div></div>;
};

export default InfiniteScroll;
