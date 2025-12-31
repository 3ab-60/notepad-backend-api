// LOGIN PAGE

// React Hooks & Routing
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI UI Components
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

// API instance for backend communication
import { api } from "../api";   //connects frontend to FastAPI

// Notification library
import toast from "react-hot-toast";

export default function Login() {

  // Local states for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION (JSON request)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/login",
        { email, password },                           // // Send login data as JSON
        { headers: { "Content-Type": "application/json" } }  // // Ensure JSON format
      );

      localStorage.setItem("token", response.data.access_token); // Store JWT token

      toast.success("Login Successful! 🎉");
      window.location.href = "/notes"; // Redirect after login
    } 
    catch (error) {
      toast.error("Login failed ❌ Check email or password");//Error message
      console.log(error.response?.data || error); // Debug log
    }
  };

  return (
    // Center the login card
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      
      <Card sx={{ width: 350, padding: 3 }}>
        {/* Login Title */}
      <Typography variant="h4" fontWeight={500} align="center" sx={{mb:1}}>
        Welcome Back
      </Typography>
      <Typography variant="body2" align="center" sx={{mb:3, color:"gray"}}>
        Login to access your notes
      </Typography>
        <CardContent>

          {/* Page Title */}
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            
            <TextField 
              fullWidth label="Email" variant="outlined" margin="normal"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />

            <TextField 
              fullWidth type="password" label="Password" variant="outlined" margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>

          {/* Navigation to Register */}
          <Typography variant="body2" align="center" marginTop={2}>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}
