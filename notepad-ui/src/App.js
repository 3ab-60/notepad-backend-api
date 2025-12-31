// Import React Router components to handle page navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Import Theme Provider
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
// Importing pages (these will be created inside /src/pages/)
import Login from "./pages/Login";            // Login screen
import Register from "./pages/Register";      // User registration screen
import Notes from "./pages/Notes";            // Main notes dashboard (CRUD)
import Calendar from "./pages/Calendar";      // Calendar view for due dates/tasks
import History from "./pages/History";        // Completed/Pending task history page
import AIChat from "./pages/AIChat";          // Loads the AI Chat page
import { Toaster } from "react-hot-toast";
function App() {
  return (
    
    <ThemeProvider theme={theme}>
     <CssBaseline />
     <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
           {/* Default route - opens Login page */}
          <Route path="/" element={<Login />} />

           {/* User Signup page */}
          <Route path="/register" element={<Register />} />

           {/* Notes CRUD operations page */}
          <Route path="/notes" element={<Notes />} />

           {/* Calendar view for tasks */}
          <Route path="/calendar" element={<Calendar />} />

           {/* Shows task history (completed/pending) */}
          <Route path="/history" element={<History />} />

           {/*Creates a URL path so user can open AI Chat by routing*/}
          <Route path="/ai" element={<AIChat />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// Exporting the App component so it can be used in index.js
export default App;
