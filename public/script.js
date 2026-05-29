// ========================
// REGISTER
// ========================

async function register() {

  alert("REGISTER FUNCTION STARTED");

  const fullname =
    document.getElementById("fullname").value;

 // ========================
// LOGIN
// ========================

async function login() {

  alert("LOGIN FUNCTION STARTED");

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

  alert("FETCH FINISHED");

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