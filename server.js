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
Generate a complete and professional DepEd MATATAG ILAW Lesson Plan.

Return ONLY pure HTML.

Requirements:

- Use a professional HTML table.
- Add border='1'.
- Use rows and columns.
- Use clean DepEd formatting.
- Use Arial font.
- Use width:100%.
- Use border-collapse: collapse.

IMPORTANT:

Create SESSION columns based on the selected number of sessions.

Maximum 5 sessions.

SESSIONS must appear as COLUMN HEADERS.

Rows must contain:

- I - INTENTIONS (Objectives)
- L - LEARNING EXPERIENCE (Pre-Lesson)
- L - LEARNING ACTIVITIES
- R - RESOURCES
- A - ASSESSMENT
- W - WAYS FORWARD (Reflection)

Before the session table, include:

1. DEPARTMENT OF EDUCATION HEADER
2. Grade Level
3. Subject
4. Topic
5. Learning Competency
6. LEARNER CONTEXT section

After the session table, include:

AI DECLARATION

"This lesson plan was generated with the assistance of Artificial Intelligence and reviewed by the teacher."

Then include a signature table:

Prepared By:
____________________
Teacher

Checked By:
____________________
School Head

Use realistic and detailed lesson content.

Do not leave any section blank.

Lesson Details:

Grade Level:
${req.body.grade}

Subject:
${req.body.subject}

Topic:
${req.body.topic}

Learning Competency:
${req.body.competency}

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