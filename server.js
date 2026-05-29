require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());


app.use(express.static("public"));
app.use("/auth", authRoutes);


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("ILAW AI Server Running");
});

app.post("/generate", async (req, res) => {

  try {

    const response =
      await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",

            content: `
Generate a professional DepEd ILAW Lesson Plan.

Return ONLY pure HTML.

Requirements:
- Use HTML table
- Add border='1'
- Use rows and columns
- Professional DepEd style

Create SESSION columns based on the selected number of sessions.

Maximum 5 sessions.

Each session must contain:
- Objectives
- Pre-Lesson
- Learning Activities
- Resources
- Assessment
- Reflection

Include:
I - Intentions
L - Learning Experience
A - Assessment
W - Ways Forward

Lesson Details:
Grade Level: ${req.body.grade}
Subject: ${req.body.subject}
Topic: ${req.body.topic}
Number of Sessions:
${req.body.sessions}

IMPORTANT:
Return HTML only.
No markdown.
No triple backticks.
`
          }
        ]

      });

    res.json({
      result:
      response.choices[0].message.content
    });

  } catch (error) {

    console.log(error);


    res.status(500).json({
  result: "SERVER ERROR: " + error.message
});


  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});