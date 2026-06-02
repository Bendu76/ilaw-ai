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


Create separate table rows for the following:

1. I - INTENTIONS

2. L - LEARNING EXPERIENCE

3. LEARNING ACTIVITIES

4. LEARNING RESOURCES

5. OPPORTUNITIES FOR INTEGRATION

6. A - ASSESSMENT

7. FORMATIVE ASSESSMENT

8. W - WAYS FORWARD

9. EXTENDED LEARNING OPPORTUNITIES

10. REFLECTION


IMPORTANT:

Each item above must have its own table row.

All rows must be visible.

Do not use rowspan.

Do not merge rows.

Do not combine Learning Activities and Learning Resources in one row.

Do not combine Extended Learning Opportunities and Reflection in one row.

Do not place sub-sections inside parent cells.

Every section and sub-section must have its own row separator.

Sessions must remain as columns.


IMPORTANT FORMATTING:

Use:

font-size: 16px;
font-weight: bold;

for:

I - INTENTIONS
L - LEARNING EXPERIENCE
A - ASSESSMENT
W - WAYS FORWARD

Use:

font-size: 12px;
font-weight: bold;

for:

Learning Activities
Learning Resources
Formative Assessment
Extended Learning Opportunities
Reflection

The sub-sections must appear visually smaller than the major sections.

Use professional DepEd ILAW formatting.


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

DECLARATION OF AI USE

Place the DECLARATION OF AI USE immediately after the REFERENCES section in the LESSON INFORMATION header.

Do NOT place the Declaration of AI Use below the ILAW table.



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