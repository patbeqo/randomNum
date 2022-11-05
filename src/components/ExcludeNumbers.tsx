import { useContext } from "react";
import { magicBallContext, useMagicBallDispatcher } from "./magicBallContext";
import Box from "@mui/material/Box";

export const ExcludeNumbers = () => {
  const { numbers } = useContext(magicBallContext);
  const { setNumbers } = useMagicBallDispatcher();

  const handleRemoveNumber = (numberToRemove: number) => {
    setNumbers(numbers.filter((number) => number !== numberToRemove));
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {numbers.map((number) => (
        <Box
          style={{
            backgroundColor: "blue",
            color: "white",
            textAlign: "center",
            height: "36px",
            width: "36px",
            borderStyle: "1px black",
            borderRadius: "25%",
            margin: "8px",
          }}
          key={number}
        >
          {number}
          <div
            style={{
              backgroundColor: "red",
              height: "20px",
              width: "20px",
              borderRadius: "50%",
            }}
            onClick={() => handleRemoveNumber(number)}
          >
            x
          </div>
        </Box>
      ))}
    </div>
  );
};
