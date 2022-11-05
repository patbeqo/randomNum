import React from "react";
import Box from "@mui/material/Box";

interface INumberSquare {
  numberToDisplay: number;
}

const NumberSquareBase = ({ numberToDisplay }: INumberSquare) => {
  return <Box style={{ height: "25px", width: "25px" }}>{numberToDisplay}</Box>;
};

export const NumberSquare = React.memo(NumberSquareBase);
