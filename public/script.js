// CHECK LOGIN

const token =
  localStorage.getItem("token");



// GET CURRENT PAGE

const currentPage =
  window.location.pathname
    .split("/")
    .pop();



// PUBLIC PAGES

const publicPages = [

  "teacher-login.html",
  "teacher-register.html",
  "payment.html"

];



// REDIRECT IF NOT LOGGED IN

if (

  !token &&

  !publicPages.includes(currentPage)

) {

  window.location.replace(
    "teacher-login.html"
  );

}



// DISPLAY CREDITS

const credits =
  localStorage.getItem("credits");

if (
  document.getElementById(
    "creditsDisplay"
  )
) {

  document.getElementById(
    "creditsDisplay"
  ).innerText =
    "Credits: " + credits;

}



// REGISTER

async function register() {

  try {

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



    // REDIRECT TO LOGIN

    if (
      data.message ===
      "Registration successful!"
    ) {

      window.location.replace(
        "teacher-login.html"
      );

    }

  } catch (error) {

    console.log(error);

    alert("REGISTER ERROR");

  }

}





// LOGIN

async function login() {

  try {

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



    // LOGIN SUCCESS

    if (data.token) {

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



      // REDIRECT TO GENERATOR

      window.location.replace(
        "index.html"
      );

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("LOGIN ERROR");

  }

}





// GENERATE LESSON PLAN

async function generateLessonPlan() {

  let credits =
    localStorage.getItem("credits");

  let isPaid =
    localStorage.getItem("isPaid");



  // CHECK PAYMENT

  if (isPaid !== "true") {

    alert(
      "Please purchase credits first."
    );

    window.location.replace(
      "payment.html"
    );

    return;

  }



  // CHECK CREDITS

  if (credits <= 0) {

    alert(
      "No credits remaining."
    );

    window.location.replace(
      "payment.html"
    );

    return;

  }



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


// PREVIEW ONLY

let previewContent =
  data.result.substring(0, 800);


// CHECK PAYMENT

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
        full lesson plan.
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



// FULL CONTENT IF PAID

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



// LOGOUT

function logout() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "credits"
  );

  localStorage.removeItem(
    "isPaid"
  );



  window.location.replace(
    "teacher-login.html"
  );

}