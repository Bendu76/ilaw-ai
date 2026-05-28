// GENERATE LESSON PLAN

async function generateLessonPlan() {

  try {

    let credits =
      parseInt(
        localStorage.getItem("credits")
      ) || 0;

    let isPaid =
      localStorage.getItem("isPaid");



    // SHOW LOADING

    document.getElementById(
      "output"
    ).innerHTML =
      "<h2>Generating ILAW Lesson Plan...</h2>";



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



    // CHECK IF AI RETURNED RESULT

    if (!data.result) {

      document.getElementById(
        "output"
      ).innerHTML =
        "<h2>Generation Failed.</h2>";

      return;

    }



    // PREVIEW CONTENT

    let previewContent =
      data.result.substring(0, 1500);



    // FREE USER = PREVIEW ONLY

    if (isPaid !== "true") {

      document.getElementById(
        "output"
      ).innerHTML =

        `
        <div style="
          white-space: pre-wrap;
          line-height: 1.6;
        ">
          ${previewContent}
        </div>

        <div
          style="
            margin-top:30px;
            padding:20px;
            background:#fff3cd;
            border:1px solid #ffeeba;
            border-radius:10px;
            text-align:center;
          "
        >

          <h2>
            🔒 Full ILAW Locked
          </h2>

          <p>
            Purchase credits to unlock
            full lesson plan and download.
          </p>

          <button

            onclick="
              window.location.href='payment.html'
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



    // CHECK CREDITS

    if (credits <= 0) {

      alert(
        "No credits remaining."
      );

      window.location.href =
        "payment.html";

      return;

    }



    // FULL CONTENT FOR PAID USERS

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



    // UPDATE DISPLAY

    document.getElementById(
      "creditsDisplay"
    ).innerText =
      "Credits: " + credits;

  } catch (error) {

    console.log(error);

    document.getElementById(
      "output"
    ).innerHTML =
      "<h2>Server Error.</h2>";

  }

}