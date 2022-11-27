import { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useMagicBallDispatcher,
  magicBallContext,
} from "../../../state/magicBallContext";
import { setCache } from "../../../services/cacheService";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const MagicBall = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [numberToDisplay, setNumberToDisplay] = useState<number | undefined>();
  const { setNumbers } = useMagicBallDispatcher();
  const { numbers } = useContext(magicBallContext);

  useEffect(() => {
    setCache(numbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spinBall = () => {
    setIsSelected(false);
    setIsSpinning(true);
    randomnlyChoose();
    setIsSpinning(false);
  };

  const removeNumber = (numToRemove: number) => {
    const newNums = numbers.filter((num) => num !== numToRemove);
    setNumbers(newNums);
    setNumberToDisplay(undefined);
    setIsSelected(false);
  };

  const randomnlyChoose = () => {
    const interval = setInterval(() => {
      setNumberToDisplay(numbers[getRandomInt(numbers.length)]);
    }, 10);

    setTimeout(() => {
      clearInterval(interval);
      setIsSelected(true);
    }, numbers.length * 100);
  };

  if (numbers.length === 0) {
    return <h3 style={{ textAlign: "center" }}>Thank you for playing!</h3>;
  }

  if (numbers) {
    return (
      <>
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
                  borderRadius: "50%",
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
                onClick={() => removeNumber(numberToDisplay!)}
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
            onClick={spinBall}
            disabled={isSpinning}
            variant="contained"
            color="success"
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </Button>
        </Box>
      </>
    );
  }

  return <CircularProgress color="secondary" />;
};
