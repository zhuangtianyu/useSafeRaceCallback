import { useRef, useCallback } from 'react';

const RACE_ERROR = new DOMException('Race Error', 'Race');

const useSafeRaceCallback = (callback: Function) => {
  const lastCalledTime = useRef(Date.now());

  return useCallback((...args) => {
    const calledTime = Date.now();

    lastCalledTime.current = calledTime;
    
    return callback(...args)
      .then(data => {
        if (calledTime === lastCalledTime.current) {
          return data;
        } else {
          throw RACE_ERROR;
        }
      });
  }, []);
};

export { useSafeRaceCallback, RACE_ERROR };
