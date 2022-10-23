import React, { useEffect } from 'react';
import useInfinitePage, { Operator } from '../../hooks/useInfinitePage';
import debounce from './debounce';
import { isBottomPosIn } from './ScrollUtility';
import { useWindowEvent } from '../../hooks/useWindowEvent';
import { defaultDuplicateDetector } from './duplicatedPlugin';
import { Page, Bundle } from './pageTypes';
import ListView from './ListView';

//#region Interface & Impl

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
const duplicateDetector = defaultDuplicateDetector((numOfDuplicate) =>
  console.log(numOfDuplicate),
);
//#endregion

const InfiniteScroll = () => {
  const { pages, status, getCurrentCursor, isNext, fetchNext, clearPages } =
    useInfinitePage<Page, Bundle>(operator, [duplicateDetector], { per: 25 });
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ListView pages={pages} status={status} />
    </div>
  );
};

export default InfiniteScroll;
