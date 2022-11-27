import React, { createContext, useContext, useState, useCallback } from "react";

import {
  INITIAL_RANGE,
  RangeType,
} from "../pages/randomNumber/components/RangeSelector";

import { getCache, clearCache, setCache } from "../services/cacheService";

interface IMagicBallContext {
  numbers: number[];
}

interface IMagicBallContextDispatcher {
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

export const magicBallContext = createContext<IMagicBallContext>({
  numbers: [],
});

const magicBallContextDispatcher = createContext<IMagicBallContextDispatcher>({
  setNumbers: () => {},
});

export const MagicBallProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [numbers, setNumbers] = useState<number[]>(() => {
    const numbers = getCache();
    return numbers ?? buildNumbers(INITIAL_RANGE);
  });

  return (
    <magicBallContextDispatcher.Provider value={{ setNumbers }}>
      <magicBallContext.Provider value={{ numbers }}>
        {children}
      </magicBallContext.Provider>
    </magicBallContextDispatcher.Provider>
  );
};

interface IUseMagicBallContext {
  clearData: () => void;
  setNumbers: (numbers: number[], updateCache?: boolean) => void;
}

export const useMagicBallDispatcher = (): IUseMagicBallContext => {
  const { setNumbers: setNumbersBase } = useContext(magicBallContextDispatcher);

  const clearData = useCallback(() => {
    clearCache();
    setNumbersBase(buildNumbers(INITIAL_RANGE));
  }, [setNumbersBase]);

  const setNumbers = useCallback(
    (numbers: number[], updateCache: boolean = true) => {
      setNumbersBase(numbers);

      if (updateCache) {
        setCache(numbers);
      }
    },
    [setNumbersBase]
  );

  return { clearData, setNumbers };
};

export function buildNumbers(range: RangeType) {
  if (range.start && range.end) {
    let tmp = [];
    for (let i = range.start; i <= range.end; i++) {
      tmp.push(i);
    }
    return tmp;
  }
  return [];
}
