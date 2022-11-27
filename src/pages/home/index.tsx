import Button from "@mui/material/Button";
import { SelectNumberRange } from "../../routes";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        style={{ width: "250px" }}
        onClick={() => navigate(SelectNumberRange)}
      >
        Random Number
      </Button>

      <Button variant="outlined" color="secondary" style={{ width: "250px" }}>
        Custom
      </Button>
    </div>
  );
}
