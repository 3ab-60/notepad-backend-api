// REGISTER PAGE

// Hooks & Components from React and Routing
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI Components for modern UI design
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

// Axios instance to communicate with FastAPI backend
import { api } from "../api";     // used to send registration data to backend

// Notification library
import toast from "react-hot-toast";

// Register Page Component
export default function Register() {

  // Local state to store form data entered by user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function runs when user submits Registration form
  // Sends user details to backend API (/auth/register)
  
  const handleRegister = async (e) => {
    e.preventDefault();                     // Prevent page refresh

    try {
      await api.post("/auth/register", { email, password });   // Send data to API
      toast.success("Registration Successful 🎉");                     // Feedback
      window.location.href = "/";                              // Redirect to Login
    } catch (err) {
      toast.error("Registration failed ❌"); //Error message
      console.log(err);
    }
  };

  return (
    // Centering the form container on screen
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>

      {/* Main Card UI box */}
      <Card sx={{ width: 350, padding: 3 }}>
        {/* Heading */}
        <Typography variant="h4" fontWeight={500} align="center">
          Create Account
        </Typography>

        {/* Subtitle */}
        <Typography variant="body2" align="center" sx={{mb:3, color:"gray"}}>
          Register to start using Notepad
        </Typography>

        <CardContent>

          {/* Page Title */}
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>

          {/* Registration Form */}
          <form onSubmit={handleRegister}>

            {/* Email Input Field */}
            <TextField 
              fullWidth label="Email" variant="outlined" margin="normal"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />

            {/* Password Input Field */}
            <TextField 
              fullWidth type="password" label="Password" variant="outlined" margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />

            {/* Submit button */}
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
              Create Account
            </Button>
          </form>

          {/* Route link to Login Page */}
          <Typography variant="body2" align="center" marginTop={2}>
            Already have an account? <Link to="/">Login here</Link>
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}
