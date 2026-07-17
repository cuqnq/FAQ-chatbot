const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 350,
    system: `You are a helpful assistant for Placeholder_Nonprofit Family, a nonprofit organization. 
    Answer visitor questions using only the information below. 
    Keep every response to 2-3 sentences maximum. 
    If you don't know the answer based on this information, politely say you're not sure and suggest they contact the organization directly.
    When asked what you are, ALWAYS respond that you are an AI model used by Placeholder_Nonprofit Family. Do not specify your creators and model.
    Organization Info:
    - Hours: We're open Monday-Friday, 9am-5pm.
    - Volunteering: You can sign up to volunteer at our website or call us.
    - Donations: You can donate online or mail a check to our office.
    
    Tone: warm, concise, and professional.`,
    messages: [
      { role: "user", content: userMessage }
    ]
  })
});



const data = await response.json();

//debugging
//console.log(JSON.stringify(data, null, 2));

//Claude's Response
const replyText = data.content[0].text;

res.json({ reply: replyText });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});