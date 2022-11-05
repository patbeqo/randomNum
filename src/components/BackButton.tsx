import React from "react";
import Button from "@mui/material/Button";
import WestIcon from "@mui/icons-material/West";

interface IBackButton {
  handleBackClick: () => void;
}

const BackButtonBase = ({ handleBackClick }: IBackButton) => (
  <Button variant="outlined" startIcon={<WestIcon />} onClick={handleBackClick}>
    Back
  </Button>
);

export const BackButton = React.memo(BackButtonBase);
