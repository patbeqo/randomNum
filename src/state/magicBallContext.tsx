import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { getCache, clearCache, setCache } from "../services/cacheService";

export type RangeType = {
  start: number;
  end: number;
};

interface IMagicBallContext {
  range: RangeType;
  numbers: number[];
}

interface IMagicBallContextDispatcher {
  setRange: React.Dispatch<React.SetStateAction<RangeType>>;
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

const INITIAL_RANGE = {
  start: 1,
  end: 10,
};

export const magicBallContext = createContext<IMagicBallContext>({
  range: INITIAL_RANGE,
  numbers: [],
});

const magicBallContextDispatcher = createContext<IMagicBallContextDispatcher>({
  setRange: () => {},
  setNumbers: () => {},
});

export const MagicBallProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [range, setRange] = useState<RangeType>(INITIAL_RANGE);

  const [numbers, setNumbers] = useState<number[]>(() => {
    const numbers = getCache();
    return numbers ?? buildNumbers(range);
  });

  useEffect(() => {
    if (!getCache()) {
      setNumbers(buildNumbers(range));
    }
  }, [range]);

  return (
    <magicBallContextDispatcher.Provider value={{ setRange, setNumbers }}>
      <magicBallContext.Provider value={{ range, numbers }}>
        {children}
      </magicBallContext.Provider>
    </magicBallContextDispatcher.Provider>
  );
};

interface IUseMagicBallContext {
  setRange: (start: number, end: number) => void;
  clearData: () => void;
  setNumbers: (numbers: number[], updateCache?: boolean) => void;
}

export const useMagicBallDispatcher = (): IUseMagicBallContext => {
  const { setRange: setRangeBase, setNumbers: setNumbersBase } = useContext(
    magicBallContextDispatcher
  );

  const setRange = useCallback(
    (start: number, end: number) => {
      setRangeBase({ start, end });
    },
    [setRangeBase]
  );

  const clearData = useCallback(() => {
    clearCache();
    setNumbersBase(buildNumbers(INITIAL_RANGE));
    setRangeBase(INITIAL_RANGE);
  }, [setRangeBase, setNumbersBase]);

  const setNumbers = useCallback(
    (numbers: number[], updateCache: boolean = true) => {
      setNumbersBase(numbers);

      if (updateCache) {
        setCache(numbers);
      }
    },
    [setNumbersBase]
  );

  return { setRange, clearData, setNumbers };
};

function buildNumbers(range: RangeType) {
  if (range.start && range.end) {
    let tmp = [];
    for (let i = range.start; i <= range.end; i++) {
      tmp.push(i);
    }
    return tmp;
  }
  return [];
}
