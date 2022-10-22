import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import WestIcon from "@mui/icons-material/West";
import CircularProgress from "@mui/material/CircularProgress";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

interface MagicBallProps {
  onBack: () => void;
  range: { start: number | undefined; end: number | undefined };
}

export const MagicBall = ({ onBack, range }: MagicBallProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [numberToDisplay, setNumberToDisplay] = useState<number>(0);

  useEffect(() => {
    if (range.start && range.end) {
      let tmp = [];
      for (let i = range.start; i <= range.end; i++) {
        tmp.push(i);
      }

      setNumbers(tmp);
    }
  }, [range.start, range.end]);

  const removeNumber = (numToRemove: number) => {
    setNumbers((prev) => prev.filter((num) => num !== numToRemove));
    setNumberToDisplay(0);
    setIsSelected(false);
  };

  const randomnlyChoose = () => {
    const tmp = setInterval(() => {
      setNumberToDisplay(numbers[getRandomInt(numbers.length)]);
    }, 10);

    setTimeout(() => {
      clearInterval(tmp);
      setIsSelected(true);
    }, numbers.length * 100);
  };

  if (!range.start || !range.end) {
    return (
      <p style={{ color: "red" }}>
        Error, invalid range selected. Please go back.
      </p>
    );
  }

  if (numbers.length === 0) {
    return (
      <div>
        <Button variant="outlined" startIcon={<WestIcon />} onClick={onBack}>
          Back
        </Button>
        <h3 style={{ textAlign: "center" }}>Thank you for playing!</h3>
      </div>
    );
  }

  if (numbers) {
    return (
      <div>
        <Button variant="outlined" startIcon={<WestIcon />} onClick={onBack}>
          Back
        </Button>
        <div>
          <p style={{ textAlign: "center" }}>{`Remaining numbers: ${numbers.map(
            (number) => number
          )}`}</p>
        </div>
        <div
          style={{
            height: "250px",
            width: "250px",
            borderRadius: "50%",
            backgroundColor: "black",
            margin: "0 auto",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              backgroundColor: "purple",
              position: "relative",
              top: "25px",
              left: "25px",
            }}
          >
            <div
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "50%",
                backgroundColor: "pink",
                position: "relative",
                top: "25px",
                left: "25px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  position: "relative",
                  top: "42px",
                  left: "42px",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <p>{numberToDisplay}</p>
              </div>
            </div>
          </div>
        </div>
        {isSelected ? (
          <div
            style={{ width: "250px", margin: "0 auto", marginBottom: "24px" }}
          >
            <h3
              style={{ textAlign: "center" }}
            >{`Number is: ${numberToDisplay}`}</h3>
            <Box textAlign="center">
              <Button
                onClick={() => removeNumber(numberToDisplay)}
                color="secondary"
                variant="contained"
              >
                Remove number
              </Button>
            </Box>
          </div>
        ) : undefined}
        <Box textAlign="center">
          <Button
            style={{ height: "48px", width: "100px" }}
            onClick={() => {
              setIsSelected(false);
              setIsSpinning(true);
              randomnlyChoose();
              setIsSpinning(false);
            }}
            disabled={isSpinning}
            variant="contained"
            color="success"
          >
            {isSpinning ? "Spinning!" : "Spin"}
          </Button>
        </Box>
      </div>
    );
  }

  return <CircularProgress color="secondary" />;
};
