import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");   // delete auth token
    navigate("/");                      // redirect to login
  };

  return (
    <AppBar position="static" sx={{ padding: 1 }}>
      <Toolbar>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/notes">Notes</Button>
        <Button color="inherit" component={Link} to="/history">History</Button>
        {/* <Button color="inherit" component={Link} to="/calendar">Calendar</Button>  (Enable later if needed) */}

        {/* Push logout to right */}
        <div style={{ flexGrow: 1 }}></div>

        <Button color="warning" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
}
