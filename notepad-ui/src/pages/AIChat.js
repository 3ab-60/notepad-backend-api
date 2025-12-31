// =================================AI CHAT PAGE ======================================
// ✔ Messages grow fully (no clipping)
// ✔ 3rd / 4th / more messages continue scrolling properly
// ✔ Auto-scroll to latest message works always
// ✔ Input never overlaps or hides messages
// ✔ Chat UI behaves like WhatsApp/ChatGPT

import { useState, useRef, useEffect } from "react";
import { api } from "../api";
import { TextField, Card, Typography, Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIChat() {

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);
  const chatRef = useRef(null);

  // Auto-scroll to bottom every time messages update
  useEffect(() => {
    setTimeout(()=>{
      bottomRef.current?.scrollIntoView({ behavior:"smooth" });
    }, 50); // small delay ensures DOM fully renders message
  }, [messages]);


  const askAI = async () => {
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: prompt }]);

    try {
      const res = await api.post("/ai/chat", { prompt });
      setMessages(prev => [...prev, { role: "ai", content: res.data.reply }]);
    }
    catch {
      setMessages(prev => [...prev, { role:"ai", content:"⚠ AI did not respond." }]);
    }

    setPrompt("");
  };


  return (
    <div style={{
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      background:"#f7f8fa"
    }}>

      {/* Header */}
      <Typography variant="h4" align="center" style={{padding:"12px 0"}}>
        🤖 AI Assistant
      </Typography>


      {/*  ================= CHAT SCROLL AREA ================= */}
      <div 
        ref={chatRef}
        style={{
          flexGrow:1,
          overflowY:"auto",
          padding:"15px",
          display:"flex",
          flexDirection:"column",
          gap:"12px",
        }}>

        {messages.map((msg, index) => (
          <Card 
            key={index}
            sx={{
              p:2,
              maxWidth:"80%",
              whiteSpace:"pre-wrap",
              wordBreak:"break-word",
              flexShrink:0,                     // <<< prevents bubble shrinking
              alignSelf: msg.role==="user"?"flex-end":"flex-start",
              background: msg.role==="user"?"#1976d2":"#e9ecff",
              color: msg.role==="user"?"white":"black",
              borderRadius:"12px",
            }}
          >
            {/* Markdown so bold/lists/headings work */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {msg.content}
            </ReactMarkdown>
          </Card>
        ))}

        <div ref={bottomRef} /> {/* Auto-scroll anchor */}
      </div>



      {/* ================= INPUT SECTION ================= */}
      <div style={{
        padding:"12px",
        display:"flex",
        gap:"10px",
        background:"white",
        borderTop:"1px solid #ccc"
      }}>
        
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          onKeyDown={(e)=> e.key==="Enter" && askAI()}
          sx={{background:"white"}}
        />

        <Button 
          variant="contained"
          onClick={askAI}
          sx={{minWidth:"55px", fontSize:"22px"}}
        >
          ➤
        </Button>
      </div>

    </div>
  );
}
