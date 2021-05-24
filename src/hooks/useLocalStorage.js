import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [data, setData] = useState(() => {
    try {
      const localVal = window.localStorage.getItem(key);
      return localVal ? JSON.parse(localVal) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
};

export default useLocalStorage;