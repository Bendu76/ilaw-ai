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

I - INTENTIONS

L - LEARNING EXPERIENCE

   Include:
   - Learning Activities
   - Resources

A - ASSESSMENT

   Include:
   - Formative Assessment

W - WAYS FORWARD

   Include:
   - Extended Learning Opportunities
   - Reflection

IMPORTANT:

Learning Activities and Learning Resources must appear inside the Learning Experience section but their font size is smaller compare to Learning Experience.

Formative Assessment must appear inside the Assessment section with open and close parenthesis.

Extended Learning Opportunities and Reflection must appear inside the Ways Forward section but their font size is smaller compare to Ways Forward.

Create separate rows for Learning Activities, Resources, Formative Assessment, Extended Learning Opportunities, or Reflection.

Declaration of AI Use should be placed below the References with a separate row.

Before the session table, include:

1. DAILY LESSON LOG - ILAW FORMAT (DepEd Order 9, s. 2026)
2. LESSON INFORMATION
3. Name of Lesson
4. Learning Area
5. Term and Week
6. Grade / Section
7. Teacher
8. References

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