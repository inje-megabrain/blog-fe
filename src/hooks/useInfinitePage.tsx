import React, { useRef, useState } from 'react';

export class Context<T, B> {
  /** Flag to check already fetching */
  private blocked: boolean;
  /** Additional Information to run operator/contex. */
  public readonly bundle: B;
  /** Post-process for comming data to append Pages. (Like middleware) */
  private readonly plugins: Plugin<T, B>[];
  /** External operation to work Hook. */
  private readonly operator: Operator<T, B>;

  constructor(operator: Operator<T, B>, plugins: Plugin<T, B>[], bundle: B) {
    this.operator = operator;
    this.plugins = plugins;
    this.bundle = bundle;
    this.blocked = false;
  }

  processWithPlugin(pages: T[], comming: T) {
    let processed: T = comming;
    for (const plugin of this.plugins) {
      if ((processed = plugin(this, pages, processed)) == undefined) break;
    }
    return processed;
  }

  block() {
    this.blocked = true;
  }
  unblock() {
    this.blocked = false;
  }
  isBlocked() {
    return this.blocked;
  }

  getNextCursor(pages: T[]) {
    if (pages.length > 0) {
      return this.operator.getNextCursor(pages, this.bundle);
    }
    return undefined;
  }

  async getNextPage(pages: T[]) {
    return this.processWithPlugin(
      pages,
      await this.operator.fetchNextPage(this.getNextCursor(pages), this.bundle),
    );
  }
}

/** External operation to work Hook. */
export interface Operator<T, B> {
  /**
   * Calculate Next Page Cursor.
   * If there is next cursor, then return number.
   * But if not cursor(means no more page), return undefined.
   * @param lastPage
   * @param totalPages
   */
  getNextCursor(pages: T[], bundle: B): number | undefined;
  /**
   * Fetch Next Page.
   * @param nextCursor the cursor that was calculated by 'getNextCursor'.
   */
  fetchNextPage(nextCursor?: number, bundle?: B): Promise<T>;
}

/** Is better readonly Context? */
export type Plugin<T, B> = (
  context: Context<T, B>,
  pages: T[],
  commingData: T,
) => T;

export type Status = 'loading' | 'done';

export interface Handle<T, B> {
  readonly pages: T[];
  status: Status;
  getCurrentCursor(): number;
  isNext(): boolean;
  fetchNext(): Promise<boolean>;
}

//#region Impl

function handleFromContext<T, B>(context: Context<T, B>) {
  const [_pages, _setPages] = useState<T[]>([]);
  const [_status, _setStatus] = useState<Status>('done');

  const self = {
    /** State - Pages fetched so far.
     * 지금까지 가져온 페이지 배열
     */
    get pages() {
      return _pages;
    },
    /**
     * State - Current Fetching Status(ref. Status Type)
     *  현재 Fetching 상태
     */
    get status() {
      return _status;
    },
    set status(value: Status) {
      switch (value) {
        case 'done':
          context.unblock();
          break;
        case 'loading':
          context.block();
          break;
      }
      _setStatus(value);
    },
    /** Return Current Cursor Position. */
    getCurrentCursor() {
      return _pages.length;
    },
    /** Check If next cursor exists. */
    isNext() {
      return context.getNextCursor(_pages) != undefined;
    },
    /** Fetch Next Page. Make sure that must be next Cursor!
     * 반드시 isNext를 통해 Next Cursor의 유/무를 확인하고 호출하세요.
     */
    async fetchNext() {
      // Already fetch then stop.
      if (context.isBlocked()) return false;
      // set Status - loading
      self.status = 'loading';

      const commingPage = await context.getNextPage(_pages);

      if (commingPage)
        _setPages((prev) => {
          prev.push(commingPage);
          return prev;
        });
      // set Status - done
      self.status = 'done';
      return commingPage != undefined;
    },
  };

  return self as Handle<T, B>;
}
//#endregion

/**
 * Operation을 꼭 완성해서 넣어주세요.
 * @param operator External Operation to work hook. (ref. Operator Interface)
 * @param plugins Post-process for comming data to append Pages.
 * @param initialBundle An Object to initialize Bundle.
 * @returns {Handle}
 */
export default function useInfinitePage<T, B>(
  operator: Operator<T, B>,
  plugins: Plugin<T, B>[],
  initialBundle?: B,
) {
  const context = useRef<Context<T, B>>();

  if (!context.current) {
    context.current = new Context<T, B>(
      operator,
      plugins,
      (initialBundle || {}) as B,
    );
  }

  return handleFromContext<T, B>(context.current as Context<T, B>);
}

//#endregion
