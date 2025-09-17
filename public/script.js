const API_URL = "/api/users";
const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();
    userList.innerHTML = "";
    if (!users.length) {
      userList.innerHTML = "<p>No users found.</p>";
      return;
    }
    users.forEach((user) => {
      const div = document.createElement("div");
      div.className = "user-card";
      div.innerHTML = `
        <div class="user-info">
          <strong>${user.name}</strong><br>
          ${user.email} | Age: ${user.age}
        </div>
        <div class="user-actions">
          <button class="edit" onclick="editUser('${user._id}', '${user.name}', '${user.email}', ${user.age})">Edit</button>
          <button class="delete" onclick="deleteUser('${user._id}')">Delete</button>
        </div>
      `;
      userList.appendChild(div);
    });
  } catch (e) {
    userList.innerHTML = `<p>Error: ${e.message}</p>`;
  }
}

userForm.addEventListener("submit", async function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  if (!name || !email || !age) {
    alert("Fill all fields");
    return;
  }
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age }),
    });
    if (!res.ok) throw new Error("Could not create user");
    userForm.reset();
    loadUsers();
  } catch (e) {
    alert(e.message);
  }
});

async function deleteUser(id) {
  if (!confirm("Delete this user?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Could not delete user");
    loadUsers();
  } catch (e) {
    alert(e.message);
  }
}

async function editUser(id, name, email, age) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("age").value = age;

  userForm.onsubmit = async function (e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          age: document.getElementById("age").value.trim(),
        }),
      });
      if (!res.ok) throw new Error("Could not update user");
      alert("User updated!");
      userForm.reset();
      loadUsers();
      userForm.onsubmit = handleSubmit;
    } catch (e) {
      alert(e.message);
    }
  };
}

loadUsers();
