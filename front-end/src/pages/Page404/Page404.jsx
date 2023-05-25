import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./page404.css";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <div className="page404Container">
      <h1>Not Found!</h1>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/homepage");
        }}
      >
        Back to the homepage
      </Button>
    </div>
  );
}
