import { Plugin } from '../../hooks/useInfinitePage';
import { Page, PageItem } from '../../types/page';

export interface Operator<P, I> {
  getItemsFromPage(page: P): I[];
  setItemsInPage(page: P, items: I[]): void;
  isEqual(lhs: I, rhs: I): boolean;
}

/**
 * @param operator 플러그인 동작에 필요한 데이터
 * @param callback 중복이 감지된 경우, 호출될 Callback
 * @returns
 */
export default function detector<P, I>(
  operator: Operator<P, I>,
  callback: (numOfDuplicated: number) => void,
) {
  /**
   * 중복이 감지된 경우, Callback 호출.
   * 주위! 중복된 값은 제거됩니다.
   */
  const plugin: Plugin<P, any> = (context, pages, comming) => {
    const commingItems = operator.getItemsFromPage(comming);

    let items = pages.reduce(
      (acc, page) => acc.concat(operator.getItemsFromPage(page)),
      [] as I[],
    );

    let numOfDuplicated = 0;
    for (let i = items.length - 1; i >= 0; i--) {
      if (operator.isEqual(items[i], commingItems[0])) {
        numOfDuplicated = items.length - i;
        break;
      }
    }

    if (numOfDuplicated > 0) {
      callback(numOfDuplicated);
      operator.setItemsInPage(comming, commingItems.slice(numOfDuplicated));
    }

    return comming;
  };

  return plugin;
}

export function defaultDetector(callback: (numOfDuplicated: number) => void) {
  return detector<Page, PageItem>(
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
    callback,
  );
}
