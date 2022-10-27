import { useEffect, useRef } from 'react';

const usePrevState = (state: any) => {
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
};

export default usePrevState;
