import { useState } from 'react';

/**
 * Custom hook for managing a value in local storage.
 * @param key - The key to use for storing the value in local storage.
 * @param initialValue - The initial value to use if no value is found in local storage.
 * @returns A tuple containing the stored value and a function to update the stored value.
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [storedValue: T, setStoredValue: (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  /**
   * Function to update the stored value and save it to local storage.
   * @param value - The new value to set.
   */
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
