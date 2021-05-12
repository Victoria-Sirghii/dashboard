import { useState } from "react";

const useLocalStorage = (): [any, (key: string, values: any) => void] => {
  const [localValues, setLocalValues] = useState();

  const setLocalStorage = (key: string, values: any) => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify([values]));
    } else {
      let valuesLocal = JSON.parse(localStorage.getItem(key) || "{}");
      const updatedValues = [...valuesLocal, values];
      setLocalValues(updatedValues as any);
      localStorage.setItem(key, JSON.stringify(updatedValues));
    }
  };

  return [localValues, setLocalStorage];
};

export default useLocalStorage;
