// NOTES PAGE 

import { useState, useEffect } from "react";
import {
  TextField, Button, Card, CardContent,
  Typography, Checkbox, FormControlLabel
} from "@mui/material";

import Navbar from "../components/Navbar";
import { api } from "../api";
import toast from "react-hot-toast";
export default function Notes() {

  /* ----------------------- Notes State ----------------------- */
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const today = new Date().toISOString().split("T")[0];


  /* ----------------------- Load Notes ----------------------- */
  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/notes/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (e) { console.log(e); }
  };


  /* ----------------------- Add Note ----------------------- */
  const addNote = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/notes/",
        { title, content, due_date: dueDate, is_completed: isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
      setTitle(""); setContent(""); setDueDate(""); setIsCompleted(false);
      toast.success("Note Added ✔");
    } catch (e) { console.log(e); }
  };


  /* ----------------------- Update Note ----------------------- */
  const updateNote = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/notes/${selectedNote.id}`, selectedNote,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
      setSelectedNote(null);
      toast.success("Updated Successfully ✔");
    } catch (e) { console.log(e); }
  };


  /* ----------------------- Delete Note ----------------------- */
  const deleteNote = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/notes/${selectedNote.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
      setSelectedNote(null);
      toast.success("Deleted 🗑");
    } catch (e) { console.log(e); }
  };


  /* ========================================================= */
  /*                       UI SECTION                          */
  /* ========================================================= */

  return (
    <>
      <Navbar />

      {/* Background Wrapper */}
      <div style={{
        width: "100%", minHeight: "100vh", background: "#F4F7FE",
        padding: "30px", display: "flex", justifyContent: "center"
      }}>

        {/* Main 2-Column Grid */}
        <div style={{
          width: "90%", maxWidth: "1250px",
          display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px"
        }}>

          {/* ---------------- LEFT COLUMN: ADD NOTE FORM ---------------- */}
          <div>
            <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
              📝 My Notes
            </Typography>

            <Button variant="outlined" sx={{ mb: 2 }}
              onClick={() => window.location.href = "/ai"}>
              🤖 AI Assistant
            </Button>

            <Card sx={{ padding: "20px" }}>

              <TextField label="Title" fullWidth sx={{ mb: 2 }}
                value={title} onChange={e => setTitle(e.target.value)} />

              <TextField label="Content" multiline rows={3} fullWidth sx={{ mb: 2 }}
                value={content} onChange={e => setContent(e.target.value)} />

              <TextField type="date" label="Due Date" fullWidth sx={{ mb: 2 }}
                value={dueDate} inputProps={{ min: today }}
                InputLabelProps={{ shrink: true }}
                onChange={e => setDueDate(e.target.value)} />

              <FormControlLabel control={
                <Checkbox checked={isCompleted}
                  onChange={() => setIsCompleted(!isCompleted)} />
              } label="Completed" sx={{ mb: 2 }} />

              <Button variant="contained" fullWidth onClick={addNote}>
                ➕ Add Note
              </Button>
            </Card>
          </div>


          {/* ---------------- RIGHT COLUMN: NOTES GRID ---------------- */}
          <div>

            <TextField placeholder="🔍 Search notes..." fullWidth sx={{ mb: 3, background: "white" }}
              value={search} onChange={e => setSearch(e.target.value)} />

            {/* Responsive Notes Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
              gap: "20px"
            }}>
              {notes
                .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
                .map(note => (
                  <Card key={note.id}
                    onClick={() => setSelectedNote(note)}
                    sx={{
                      cursor: "pointer", padding: 2,
                      "&:hover": { transform: "scale(1.03)", boxShadow: 4 },
                      transition: ".2s"
                    }}>
                    <CardContent>
                      <Typography variant="h6">{note.title}</Typography>
                      <Typography>{note.content.slice(0, 80)}...</Typography>
                      <Typography fontSize={13}>📅 {note.due_date?.split("T")[0] || "No Date"}</Typography>
                      <Typography fontSize={13}
                        color={note.is_completed ? "green" : "red"}>
                        {note.is_completed ? "Completed ✔" : "Pending ⏳"}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </div>

          </div>
        </div>
      </div>


      {/* ------------------------------ EDIT MODAL---------------------------- */}
      {selectedNote && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}
          onClick={() => setSelectedNote(null)}
        >

          <Card sx={{ width: 380, p: 3 }} onClick={e => e.stopPropagation()}>
            <Typography variant="h5">Edit Note</Typography>

            <TextField fullWidth label="Title" sx={{ mt: 2 }}
              value={selectedNote.title}
              onChange={e => setSelectedNote({ ...selectedNote, title: e.target.value })} />

            <TextField fullWidth multiline rows={4} label="Content" sx={{ mt: 2 }}
              value={selectedNote.content}
              onChange={e => setSelectedNote({ ...selectedNote, content: e.target.value })} />

            <TextField type="date" fullWidth label="Due Date" sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              value={selectedNote.due_date || ""}
              onChange={e => setSelectedNote({ ...selectedNote, due_date: e.target.value })} />

            <FormControlLabel sx={{ mt: 2 }} control={
              <Checkbox checked={selectedNote.is_completed}
                onChange={e => setSelectedNote({ ...selectedNote, is_completed: e.target.checked })} />
            } label="Completed" />


            {/* 3 BUTTONS IN ONE ROW */}
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <Button variant="outlined" fullWidth onClick={() => window.location.href = "/history"}>History</Button>
              <Button variant="outlined" fullWidth color="error" onClick={deleteNote}> Delete</Button>
              <Button variant="outlined" fullWidth color="warning" onClick={() => setSelectedNote(null)}>✖ Close</Button>
            </div>


            {/* SAVE → stay separate + full width */}
            <Button variant="contained" fullWidth sx={{ mt: 2 }}
              onClick={updateNote}>
              💾 Save Changes
            </Button>
          </Card>

        </div>
      )}

    </>
  );
}
