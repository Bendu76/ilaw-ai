```js
// ========================
// REGISTER
// ========================

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
          "Content-Type":
            "application/json"
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


// ========================
// LOGIN
// ========================

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
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          email,
          password

        })
      }
    );

  const data =
    await response.json();

  alert(data.message);

  if (data.success) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "credits",
      data.credits
    );

    localStorage.setItem(
      "isPaid",
      data.isPaid
    );

    window.location.href =
      "index.html";

  }

}


// ========================
// LOGIN PROTECTION
// ========================

if (
  window.location.pathname
    .includes("index.html")
) {

  const token =
    localStorage.getItem("token");

  if (!token) {

    window.location.href =
      "teacher-login.html";

  }

}


// ========================
// GENERATE LESSON PLAN
// ========================

async function generateLessonPlan() {

  try {

    let credits =
      parseInt(
        localStorage.getItem(
          "credits"
        )
      ) || 0;

    let isPaid =
      localStorage.getItem(
        "isPaid"
      );

    document.getElementById(
      "output"
    ).innerHTML =
      "<h2>Generating ILAW Lesson Plan...</h2>";

    const grade =
      document.getElementById(
        "grade"
      ).value;

    const subject =
      document.getElementById(
        "subject"
      ).value;

    const topic =
      document.getElementById(
        "topic"
      ).value;

    const sessions =
      document.getElementById(
        "sessions"
      ).value;

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

    if (!data.result) {

      document.getElementById(
        "output"
      ).innerHTML =
        "<h2>Generation Failed.</h2>";

      return;

    }

    let previewContent =
      data.result.substring(
        0,
        1500
      );

    if (isPaid !== "true") {

      document.getElementById(
        "output"
      ).innerHTML =

        previewContent +

        `
        <hr>

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
        >
          Buy Credits
        </button>
        `;

      return;

    }

    document.getElementById(
      "output"
    ).innerHTML =
      data.result;

  } catch (error) {

    console.log(error);

    document.getElementById(
      "output"
    ).innerHTML =
      "<h2>Server Error.</h2>";

  }

}
```
