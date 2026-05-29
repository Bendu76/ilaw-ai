// ========================
// REGISTER
// ========================

async function register() {

  alert("REGISTER FUNCTION STARTED");

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

  alert("FETCH FINISHED");

  const data =
    await response.json();

  alert(data.message);

  if (data.success) {

    window.location.href =
      "teacher-login.html";

  }

}