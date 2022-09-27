import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSafeRaceCallback, RACE_ERROR } from './useSafeRaceCallback';

const fetch = query => {
  const duration = Math.ceil(Math.random() * 1000);

  return new Promise(resolve => {
    setTimeout(resolve, duration, query);
  });
};

const Demo = () => {
  const [query, setQuery] = useState('');
  const safeFetch = useSafeRaceCallback(fetch);

  useEffect(() => {
    safeFetch(query)
      .then(data => {
        // Apply data
        console.log(data);
      })
      .catch(error => {
        if (error === RACE_ERROR) {
          // Do nothing
        } else {
          alert(error.message);
        }
      });
  }, [query]);

  return (
    <div className="demo">
      <input
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </div>
  );
};

export default Demo;
