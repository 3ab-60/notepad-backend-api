// =================== HISTORY PAGE ===================
// Shows pending + completed notes separately

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { api } from "../api";
import Navbar from "../components/Navbar";   

export default function History() {

  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);

  // Fetch notes when page opens
  useEffect(() => {
    loadPending();
    loadCompleted();
  }, []);

  // Load pending tasks
  const loadPending = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/notes/pending", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPending(res.data);
    } catch (err) { console.log(err); }
  };

  // Load completed tasks
  const loadCompleted = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/notes/completed", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompleted(res.data);
    } catch (err) { console.log(err); }
  };

  return (
    <>
      <Navbar /> {/* Navbar inserted */}

      <div style={{ padding: 25 }}>
        <Typography variant="h4">📜 History</Typography>

        {/* ------- Pending Notes ------- */}
        <Typography variant="h6" sx={{ mt: 2 }}>⏳ Pending Notes</Typography>
        <Divider sx={{ mb: 2 }} />

        {pending.length === 0 && <p>No pending notes</p>}
        {pending.map(n => (
          <Card key={n.id} sx={{ mb: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6">{n.title}</Typography>
              <Typography>{n.content}</Typography>
              <Typography sx={{ fontSize: 14 }}>📅 {n.due_date}</Typography>
              <Typography sx={{ color: "red" }}>Pending ⏳</Typography>
            </CardContent>
          </Card>
        ))}

        {/* ------- Completed Notes ------- */}
        <Typography variant="h6" sx={{ mt: 4 }}>✔ Completed Notes</Typography>
        <Divider sx={{ mb: 2 }} />

        {completed.length === 0 && <p>No completed notes</p>}
        {completed.map(n => (
          <Card key={n.id} sx={{ mb: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6">{n.title}</Typography>
              <Typography>{n.content}</Typography>
              <Typography sx={{ fontSize: 14 }}>📅 {n.due_date}</Typography>
              <Typography sx={{ color: "green" }}>Completed ✔</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
