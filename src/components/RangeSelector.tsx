import { useState, useContext, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EastIcon from "@mui/icons-material/East";
import { useMagicBallDispatcher, magicBallContext } from "./magicBallContext";
import { ExcludeNumbers } from "./ExcludeNumbers";

interface IRangeSelector {
  goNext: () => void;
}

export const RangeSelector = ({ goNext }: IRangeSelector) => {
  const [error, setError] = useState<string | undefined>();
  const { setRange } = useMagicBallDispatcher();
  const {
    range: { start, end },
  } = useContext(magicBallContext);

  const setStartNumber = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(undefined);
    setRange(parseInt(e.target.value), end);
  };

  const setEndNumber = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(undefined);
    setRange(start, parseInt(e.target.value));
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
        Please enter a range of number to begin
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
          value={start}
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
          value={end}
          onChange={setEndNumber}
          label="end"
        />
      </div>
      {error ? (
        <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
      ) : undefined}

      <ExcludeNumbers />
      <Button
        style={{ width: "100%", height: "48px" }}
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
