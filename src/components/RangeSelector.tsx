import { useState, ChangeEvent, useRef, useTransition } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EastIcon from "@mui/icons-material/East";
import LinearProgress from "@mui/material/LinearProgress";

import {
  useMagicBallDispatcher,
  buildNumbers,
} from "../state/magicBallContext";
import { ExcludeNumbers } from "./ExcludeNumbers";
export const INITIAL_RANGE = {
  start: 1,
  end: 10,
};

export type RangeType = typeof INITIAL_RANGE;

interface IRangeSelector {
  goNext: () => void;
}

export const RangeSelector = ({ goNext }: IRangeSelector) => {
  const [error, setError] = useState<string | undefined>();
  const range = useRef<RangeType>(INITIAL_RANGE);
  const { setNumbers } = useMagicBallDispatcher();
  const [isPending, startTransition] = useTransition();

  const { start, end } = range.current;

  const setStartNumber = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(undefined);
    const newRange = { ...range.current, start: parseInt(e.target.value) };
    range.current = newRange;
    startTransition(() => {
      setNumbers(buildNumbers(newRange), false);
    });
  };

  const setEndNumber = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(undefined);
    const newRange = { ...range.current, end: parseInt(e.target.value) };
    range.current = newRange;
    startTransition(() => {
      setNumbers(buildNumbers(newRange), false);
    });
  };

  const handleContinue = () => {
    if (start >= end) {
      setError("Error: starting number should be less than ending number");
    } else {
      goNext();
    }
  };

  return (
    <div
      style={{
        margin: "64px auto",
        maxWidth: "400px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        Please enter a range of numbers to begin
      </h3>
      <div style={{ display: "flex", marginBottom: "24px" }}>
        <TextField
          style={{ marginRight: "16px" }}
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          onChange={setStartNumber}
          label="start"
        />
        <TextField
          type="number"
          InputProps={{
            inputProps: {
              min: 2,
            },
          }}
          onChange={setEndNumber}
          label="end"
        />
      </div>
      {error ? (
        <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
      ) : undefined}
      {isPending ? <LinearProgress color="secondary" /> : undefined}
      <ExcludeNumbers />
      <Button
        style={{ width: "100%", height: "48px", marginTop: "24px" }}
        variant="outlined"
        endIcon={<EastIcon />}
        disabled={!!error}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};
