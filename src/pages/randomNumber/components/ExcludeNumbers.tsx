import { useContext } from "react";
import { magicBallContext, useMagicBallDispatcher } from "../../../state/magicBallContext";
import Box from "@mui/material/Box";
import { Animate } from "./Animate";

export const ExcludeNumbers = () => {
  const { numbers } = useContext(magicBallContext);
  const { setNumbers } = useMagicBallDispatcher();

  const handleRemoveNumber = (numberToRemove: number) => {
    setNumbers(
      numbers.filter((number) => number !== numberToRemove),
      false
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {numbers.map((number, idx) => (
        <Animate key={number} order={idx}>
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
              cursor: "pointer",
            }}
            onClick={() => handleRemoveNumber(number)}
          >
            {number}
            <div
              style={{
                backgroundColor: "red",
                height: "20px",
                width: "20px",
                borderRadius: "50%",
              }}
            >
              x
            </div>
          </Box>
        </Animate>
      ))}
    </div>
  );
};
