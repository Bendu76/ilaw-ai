
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const mongoose = require("mongoose");

const User = require("./models/User");

const authRoutes = require("./routes/auth");

const verifyToken =
require("./middleware/auth");


/*
const user =
  await User.findById(req.user.id);

if (!user) {

  return res.status(404).json({
    result: "User not found"
  });

}

if (user.credits <= 0) {

  return res.status(403).json({
    result:
      "Please purchase credits first"
  });

}
*/

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

/*
app.post(
  "/generate",
  verifyToken,
  async (req, res) => {

  try {
   */

  app.post(
  "/generate",
  verifyToken,
  async (req, res) => {

  try {

const user =
  await User.findById(req.user.id);

if (!user) {

  return res.status(404).json({
    result: "User not found"
  });

}

if (user.credits <= 0) {

  return res.status(403).json({
    result:
      "Please purchase credits first"
  });

}

    /*
    if (user.credits <= 0) {

      return res.status(403).json({
        result:
          "Please purchase credits first"
      });
    }
    */

    const response =
      await client.chat.completions.create({


        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",


content: `
Generate a complete and professional DepEd MATATAG ILAW Lesson Plan.

IMPORTANT LANGUAGE RULE:

Determine the language based on the Topic and Learning Competency.

If the Topic or Learning Competency is written in Filipino,
generate ALL lesson content in Filipino.

If the Topic or Learning Competency is written in English,
generate ALL lesson content in English.

Do NOT mix English and Filipino.

The entire ILAW lesson plan must use only one language.

This rule applies to:

- Lesson Information
- I - Intentions
- L - Learning Experience
- Learning Activities
- Learning Resources
- Opportunities for Integration
- A - Assessment
- Formative Assessment
- W - Ways Forward
- Extended Learning Opportunities
- Reflection

If Filipino is detected, all session content, activities, assessments, and reflections must be written completely in Filipino.


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

Use professional DepEd colors:
- SESSION header: background-color #4472C4; color white;
- Major Sections (I, L, A, W): background-color #D9EAD3;
- Sub-sections: background-color #EDEDED;

IMPORTANT:

The SECTIONS header cell must have the same style as the SESSION header cells.

Use:
background-color: #4472C4;
color: white;
font-weight: bold;
font-size: 16px;
text-align: center;

The SECTIONS cell must NOT use the Major Section style.

Maximum 5 sessions.

SESSIONS must appear as COLUMN HEADERS.

IMPORTANT:

Create ONLY ONE session header row.

The SECTIONS header cell must use the same style as SESSION headers:

background-color: #4472C4;
color: white;
font-weight: bold;
font-size: 16px;
text-align: center;

Display:

SECTIONS | SESSION 1 | SESSION 2 | SESSION 3 | SESSION 4 | SESSION 5

ONLY ONCE at the beginning of the ILAW table.

Do NOT repeat the session header row anywhere else.

Do NOT create another SESSION header before Reflection.

Do NOT create another SESSION header before Ways Forward.


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
Opportunities for Integration
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


IMPORTANT HEADER FORMAT:

Before the Lesson Information table, create:

1. DAILY LESSON LOG - ILAW FORMAT (DepEd Order 9, s. 2026)

IMPORTANT:

Use only standard ASCII characters.

Do NOT use:
– — ‘ ’ “ ”

Use only:
- ' "

Use:
background-color: #173A7A;
color: white;
font-size: 20px;
font-weight: bold;
text-align: center;


All content inside Session cells must use:

font-family: Arial, sans-serif;
font-size: 12px;
font-weight: normal;
line-height: 1.3;

Apply the same font style to all Session 1 to Session 5 cells.

Do not use different font sizes inside session content.

2. LESSON INFORMATION

Use:
background-color: #D9E3F0;
color: #173A7A;
font-size: 18px;
font-weight: bold;

The LESSON INFORMATION title must appear in its own bordered row before the lesson information table.


The LESSON INFORMATION section must be displayed as a bordered table.

Use:

width:100%;
border-collapse:collapse;
table-layout:fixed;

The first column must be 30%.

The second column must be 70%.

All rows must align perfectly.

All borders must connect without gaps.


Use visible grid lines.

Each item must have its own row:

- Name of Lesson
- Learning Area
- Term and Week
- Grade / Section
- Teacher
- References
- Declaration of AI Use

Use a two-column table:

Column 1 = Label
Column 2 = Value

Apply borders to all cells.
Do not display lesson information as plain text.

IMPORTANT:

Opportunities for Integration must use the same style as:

- Learning Activities
- Learning Resources
- Formative Assessment
- Extended Learning Opportunities
- Reflection

Use:
font-size: 12px;
font-weight: bold;
background-color: #EDEDED;

After the session table, include:

DECLARATION OF AI USE

Place the DECLARATION OF AI USE immediately after the REFERENCES section in the LESSON INFORMATION header.

Do NOT place the Declaration of AI Use below the ILAW table.

<table style="width:100%; border:none; margin-top:20px;">
<tr>

<td style="width:50%; text-align:center; border:none;">
Prepared By:<br><br><br>
_________________________<br>
Teacher
</td>

<td style="width:50%; text-align:center; border:none;">
Checked By:<br><br><br>
_________________________<br>
School Head
</td>

</tr>
</table>


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