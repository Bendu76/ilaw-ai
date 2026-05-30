async function loadUsers() {

  const response =
    await fetch(
      "http://127.0.0.1:3000/auth/users"
    );

  const users =
    await response.json();

  let rows = "";

  users.forEach((user) => {

    rows += `

      <tr>

        <td>${user.fullname}</td>

        <td>${user.email}</td>

        <td>${user.credits}</td>

        <td>

          <button onclick="addCredits('${user._id}')">

            +50 Credits

          </button>

        </td>

      </tr>

    `;

  });

  document.getElementById(
    "usersTable"
  ).innerHTML = rows;

}



async function addCredits(id) {

  const response =
    await fetch(

      "http://127.0.0.1:3000/auth/add-credits/" + id,

      {
        method: "PUT"
      }

    );

  const data =
    await response.json();

  alert(data.message);

  loadUsers();

}



loadUsers();