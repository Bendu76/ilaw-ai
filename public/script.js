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

  alert(JSON.stringify(data));
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
      "dashboard.html";
  }
}

window.login = login;