import { useEffect } from 'react';

/**
 * Window에 이벤트 등록함. 다른데 아님.
 * @param eTypes Event Type's Name
 * @param listener Listener
 */
export function useWindowEvent(
  eTypes: (keyof WindowEventMap)[],
  listener: (event: any) => void,
) {
  useEffect(() => {
    // To remove event listener
    const _listener = (_e: any) => listener(_e);

    // Register Listeners
    eTypes.forEach((eventName) => {
      window.addEventListener(eventName, _listener);
    });
    // Remove Listeners
    return () => {
      eTypes.forEach((eventName) => {
        window.removeEventListener(eventName, _listener);
      });
    };
  }, [eTypes, listener]);
}
