async function register() {

  alert("REGISTER STARTED");

  const fullname =
    document.getElementById("fullname").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  alert("FIELDS OK");

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

  alert("FETCH DONE");

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

  alert("LOGIN STARTED");

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

  alert(JSON.stringify(data));

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

  const sessions =
    document.getElementById("sessions").value;

  const ilaw = `

<h2>DAILY LESSON LOG — ILAW FORMAT</h2>

<h3>📌 LESSON INFORMATION</h3>

<p><b>Name of Lesson:</b> ${topic}</p>
<p><b>Learning Area:</b> ${subject}</p>
<p><b>Grade Level:</b> ${grade}</p>
<p><b>Number of Sessions:</b> ${sessions}</p>

<h3>🎯 I — INTENTIONS</h3>

<p><b>Learning Competency:</b></p>
<p>Demonstrate understanding of ${topic}</p>

<p><b>Learner Context:</b></p>
<p>Learners develop knowledge and skills through meaningful activities.</p>

<h3>📚 L — LEARNING EXPERIENCE</h3>

<p><b>Learning Objectives</b></p>

<ul>
<li>Define ${topic}</li>
<li>Explain concepts related to ${topic}</li>
<li>Apply learning through activities</li>
</ul>

<p><b>Pre-Lesson</b></p>

<p>Review previous lesson and motivate learners through examples related to ${topic}.</p>

<p><b>Learning Activities</b></p>

<ol>
<li>Introduction</li>
<li>Discussion of ${topic}</li>
<li>Guided Practice</li>
<li>Group Activity</li>
<li>Assessment</li>
<li>Generalization</li>
</ol>

<p><b>Learning Resources</b></p>

<ul>
<li>Textbook</li>
<li>Activity Sheets</li>
<li>PowerPoint Presentation</li>
<li>Visual Aids</li>
</ul>

<h3>📊 A — ASSESSMENT</h3>

<p>Teacher observation, questioning, quiz, and performance task.</p>

<h3>🌱 W — WAYS FORWARD</h3>

<p>Provide enrichment activities and remediation based on learner performance.</p>

<h3>✍️ REFLECTIONS</h3>

<p>Reflect on learner participation, mastery, and areas needing improvement.</p>

<hr>

<h3>PREPARED, CHECKED AND NOTED BY</h3>

<p><b>Prepared by:</b><br>
LUVISMINDO U. DUAN, JR<br>
Teacher</p>

`;

  document.getElementById("output").innerHTML =
    ilaw;

}

window.generateLessonPlan =
  generateLessonPlan;

