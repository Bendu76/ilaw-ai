// GENERATE LESSON PLAN

async function generateLessonPlan() {

  let credits =
    localStorage.getItem("credits");

  let isPaid =
    localStorage.getItem("isPaid");



  const grade =
    document.getElementById("grade").value;

  const subject =
    document.getElementById("subject").value;

  const topic =
    document.getElementById("topic").value;

  const sessions =
    document.getElementById("sessions").value;



  const response =
    await fetch(
      "https://ilaw-ai.onrender.com/generate",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          grade,
          subject,
          topic,
          sessions

        })

      }
    );



  const data =
    await response.json();



  // PREVIEW CONTENT

  let previewContent =
    data.result.substring(0, 1500);



  // FREE USER = PREVIEW ONLY

  if (isPaid !== "true") {

    document.getElementById(
      "output"
    ).innerHTML =

      previewContent +

      `

      <div
        style="
          margin-top:30px;
          padding:20px;
          background:#fff3cd;
          border:1px solid #ffeeba;
          border-radius:10px;
          text-align:center;
        ">

        <h2>
          🔒 Full ILAW Locked
        </h2>

        <p>
          Purchase credits to unlock
          full lesson plan and download.
        </p>

        <button

          onclick="
            window.location.href=
            'payment.html'
          "

          style="
            padding:15px 25px;
            background:green;
            color:white;
            border:none;
            border-radius:5px;
            cursor:pointer;
          "

        >

          Buy Credits

        </button>

      </div>

      `;

    return;

  }



  // PAID USER = FULL CONTENT

  document.getElementById(
    "output"
  ).innerHTML =
    data.result;



  // DEDUCT CREDIT

  credits--;



  localStorage.setItem(
    "credits",
    credits
  );



  document.getElementById(
    "creditsDisplay"
  ).innerText =
    "Credits: " + credits;

}