import React from "react";
import Button from "@mui/material/Button";
import WestIcon from "@mui/icons-material/West";
import { useNavigate, useLocation } from "react-router-dom";

const BackButtonBase = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/") {
    return null;
  }

  return (
    <Button
      variant="outlined"
      startIcon={<WestIcon />}
      onClick={() => {
        navigate(-1);
      }}
    >
      Back
    </Button>
  );
};

export const BackButton = React.memo(BackButtonBase);
