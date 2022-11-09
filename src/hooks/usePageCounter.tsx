import { useRef } from 'react';

export default function usePageCounter(initialCursor = 0) {
  const page = useRef<{ cursor: number; blocked: boolean }>();

  if (!page.current)
    page.current = {
      cursor: initialCursor,
      blocked: false,
    };

  return {
    isBlocked() {
      return page.current ? page.current.blocked : true;
    },
    getNextCursor() {
      if (page.current) {
        page.current.blocked = true;
        return page.current.cursor + 1;
      }
      return initialCursor;
    },
    confirmNextCursor(success: boolean) {
      if (page.current) {
        if (success) page.current.cursor++;
        page.current.blocked = false;
      }
    },
  };
}
