async function register() {


  const fullname =
    document.getElementById("fullname").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  
  const response =
    await fetch(
      "https://ilaw-ai.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullname,
          email,
          password
        })
      }
    );

  

  const data =
    await response.json();

  alert(data.message);

  if (data.success) {

    window.location.href =
      "teacher-login.html";

  }

}

window.register = register;


async function login() {

  

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const response =
    await fetch(
      "https://ilaw-ai.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

  const data =
    await response.json();

  

  if (data.success) {

    localStorage.setItem(
      "teacher",
      JSON.stringify(data.teacher)
    );

    window.location.href =
      "index.html";
  }
}

window.login = login;



async function generateLessonPlan() {

  const grade =
    document.getElementById("grade").value;

  const subject =
    document.getElementById("subject").value;



    const topic =
  document.getElementById("topic").value;

const competency =
  document.getElementById("competency").value;


const language =
  detectLanguage(competency);

console.log(
  "Detected Language:",
  language
);


let objectivesLabel;
let assessmentLabel;
let reflectionLabel;

let learnerContext;
let preLessonLabel;
let resourcesLabel;
let aiUseLabel;
let remediationLabel;

let objectivesContent;
let preLessonContent;
let session1Content;
let session2Content;
let session3Content;
let session4Content;
let session5Content;


if (language === "filipino") {

  objectivesLabel = "Mga Layunin";
  assessmentLabel = "Pagtataya";
  reflectionLabel = "Pagninilay";

  learnerContext =
    "Napaunlad ng mga mag-aaral ang kaalaman at kasanayan sa pamamagitan ng makabuluhang gawain.";

  preLessonLabel = "Panimulang Gawain";
  resourcesLabel = "Mga Kagamitan";
  aiUseLabel = "Pahayag sa Paggamit ng AI";
  remediationLabel = "Pagpapayaman / Remediation";


  objectivesContent = `
  &bull; Matukoy ang ${topic}<br>
  &bull; Maipaliwanag ang mga konseptong kaugnay ng ${topic}<br>
  &bull; Mailapat ang natutuhan sa mga gawaing pampagkatuto
`;


  preLessonContent =
    "Balik-aralan ang nakaraang aralin at ihanda ang mga mag-aaral.";

  session1Content =
    `Pagpapakilala at talakayan tungkol sa ${topic}`;

  session2Content =
    "Pinatnubayang pagsasanay";

  session3Content =
    "Pangkatang gawain";

  session4Content =
    "Pagtataya at gawaing pagganap";

  session5Content =
    "Paglalahat at pagninilay";

} else {

  objectivesLabel = "Learning Objectives";
  assessmentLabel = "Assessment";
  reflectionLabel = "Reflections";

  learnerContext =
    "Learners develop knowledge and skills through meaningful activities.";

  preLessonLabel = "Pre-Lesson";
  resourcesLabel = "Resources";
  aiUseLabel = "Declaration of AI Use";
  remediationLabel = "Remediation / Enrichment";


  objectivesContent = `
  • Define ${topic}<br>
  • Explain concepts related to ${topic}<br>
  • Apply learning through activities
  `;

  
  preLessonContent =
    "Review previous lesson and motivate learners.";

  session1Content =
    `Introduction and discussion of ${topic}`;

  session2Content =
    "Guided practice activities";

  session3Content =
    "Collaborative learning activities";

  session4Content =
    "Assessment and performance task";

  session5Content =
    "Generalization and reflection";

}



const sessions =
  document.getElementById("sessions").value;


  const ilaw = `


<h2 style="text-align:center;color:red;">
DAILY LESSON LOG (ILAW FORMAT V2 TEST)
</h2>



<table border="1"
       width="100%"
       cellspacing="0"
       cellpadding="8">

<tr>
  <td width="25%"><b>Learning Area</b></td>
  <td>${subject}</td>
  <td><b>Grade Level</b></td>
  <td>${grade}</td>
</tr>

<tr>
  <td><b>Topic</b></td>
  <td colspan="3">${topic}</td>
</tr>

<tr>
  <td><b>Number of Sessions</b></td>
  <td colspan="3">${sessions}</td>
</tr>

<tr>
  <td colspan="4"
      style="background:#eaeaea;">
      <b>I. INTENTIONS</b>
  </td>
</tr>



<tr>
  <td><b>Learning Competency</b></td>
  <td colspan="3">
    ${competency}
  </td>
</tr>



<tr>
  <td><b>Learner Context</b></td>
  <td colspan="3">
  ${learnerContext}
  </td>
</tr>


<tr>
  <td colspan="4"
      style="background:#eaeaea;">
      <b>L. LEARNING EXPERIENCE</b>
  </td>
</tr>


<tr>
  <td><b>${objectivesLabel}</b></td>
  <td colspan="3">
    ${objectivesContent}

  </td>
</tr>

<tr>
  <td><b>${preLessonLabel}</b></td>
  <td colspan="3">
  ${preLessonContent}
  </td>
</tr>

<tr>
  <td><b>Session 1</b></td>
  <td colspan="3">
    ${session1Content}
  </td>
</tr>

<tr>
  <td><b>Session 2</b></td>
  <td colspan="3">
  ${session2Content}
  </td>
</tr>

<tr>
  <td><b>Session 3</b></td>
  <td colspan="3">
  ${session3Content}
  </td>
</tr>

<tr>
  <td><b>Session 4</b></td>
  <td colspan="3">
  ${session4Content}
  </td>
</tr>

<tr>
  <td><b>Session 5</b></td>
  <td colspan="3">
  ${session5Content}
  </td>
</tr>


<tr>
  <td><b>${resourcesLabel}</b></td>
  <td colspan="3">
    Textbook, Activity Sheets,
    PowerPoint Presentation,
    Visual Aids
  </td>
</tr>

<tr>
  <td><b>${aiUseLabel}</b></td>
  <td colspan="3">
    This Daily Lesson Log was initially generated
    using ILAW Lesson Plan AI. The teacher reviewed,
    validated, modified, and contextualized the content
    to ensure alignment with learner needs,
    curriculum standards, and DepEd policies.
  </td>
</tr>



<tr>
  <td colspan="4"
      style="background:#eaeaea;">
      <b>A. ASSESSMENT</b>
  </td>
</tr>

<tr>
  <td><b>${assessmentLabel}</b></td>
  <td colspan="3">
    Quiz, performance task,
    teacher observation,
    oral recitation.
  </td>
</tr>

<tr>
  <td colspan="4"
      style="background:#eaeaea;">
      <b>W. WAYS FORWARD</b>
  </td>
</tr>

<tr>
  <td><b>${remediationLabel}</b></td>
  <td colspan="3">
    Provide enrichment and remediation activities based on learner performance.
  </td>
</tr>

<tr>
  <td colspan="4"
      style="background:#eaeaea;">
      <b>${reflectionLabel}</b>
  </td>
</tr>

<tr>
  <td colspan="4">
    Reflect on learner participation,
    mastery, and areas needing improvement.
  </td>
</tr>

</table>

<br><br>

<h3>PREPARED BY</h3>

<p>
<b>_____________________</b><br>
Teacher
</p>

`;

  document.getElementById("output").innerHTML =
    ilaw;

}

window.generateLessonPlan =
  generateLessonPlan;
