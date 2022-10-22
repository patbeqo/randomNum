import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EastIcon from "@mui/icons-material/East";

interface RangeSelectorProps {
  onContinue: (start: number, end: number) => void;
}

export const RangeSelector = ({ onContinue }: RangeSelectorProps) => {
  const [startingNumber, setStartingNumber] = useState<number>(1);
  const [endingNumber, setEndingNumber] = useState<number>(10);
  const [error, setError] = useState<string | undefined>();

  return (
    <div
      style={{
        margin: "64px auto",
        width: "400px",
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
          value={startingNumber}
          onChange={(e) => {
            setError(undefined);
            setStartingNumber(parseInt(e.target.value));
          }}
          label="start"
        />
        <TextField
          type="number"
          InputProps={{
            inputProps: {
              min: 2,
            },
          }}
          value={endingNumber}
          onChange={(e) => {
            setError(undefined);
            setEndingNumber(parseInt(e.target.value));
          }}
          label="end"
        />
      </div>
      {error ? (
        <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
      ) : undefined}

      <Button
        style={{ width: "100%", height: "48px" }}
        variant="outlined"
        endIcon={<EastIcon />}
        disabled={error ? true : false}
        onClick={() => {
          if (startingNumber >= endingNumber) {
            setError("Error: starting number should be less than ending number");
          } else if (isNaN(startingNumber) || isNaN(endingNumber)) {
            setError("Error: invalid number input");
          } else {
            onContinue(startingNumber, endingNumber);
          }
        }}
      >
        Continue
      </Button>
    </div>
  );
};
