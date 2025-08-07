// Get currently logged-in user
const currentUser = sessionStorage.getItem("loggedInUser");
let users = JSON.parse(localStorage.getItem("users")) || [];

// If admin@gmail.com is logged in but doesn't exist in users array, create it
if (currentUser === "admin@gmail.com") {
  const adminExists = users.find(u => u.email === "admin@gmail.com");
  if (!adminExists) {
    users.push({ email: "admin@gmail.com", password: "12345", isAdmin: true });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Ensure admin@gmail.com has admin privileges
const adminIndex = users.findIndex(u => u.email === "admin@gmail.com");
if (adminIndex !== -1 && !users[adminIndex].isAdmin) {
  users[adminIndex].isAdmin = true;
  localStorage.setItem("users", JSON.stringify(users));
}

// Refresh users array after potential updates
users = JSON.parse(localStorage.getItem("users")) || [];
const loggedUser = users.find(u => u.email === currentUser);

// Special handling for admin@gmail.com
if (currentUser === "admin@gmail.com") {
  // Admin is always allowed
  console.log("Admin access granted");
} else if (!loggedUser || !loggedUser.isAdmin) {
  alert("Access denied! Only admin can view this page.");
  window.location.href = "index.html";
}

// Render user table
const table = document.getElementById("userTable");

function renderUserTable() {
  let html = "<tr><th>Email</th><th>Is Admin</th><th>Actions</th></tr>";
  users.forEach((user, index) => {
    html += `<tr>
      <td>${user.email}</td>
      <td>${user.isAdmin ? "Yes" : "No"}</td>
      <td>
        ${user.email !== currentUser
          ? `<button onclick="deleteUser(${index})">Delete</button>
             <button onclick="toggleAdmin(${index})">${user.isAdmin ? "Remove Admin" : "Make Admin"}</button>`
          : "—"}
      </td>
    </tr>`;
  });

  table.innerHTML = html;
}

renderUserTable();

// Delete a user
function deleteUser(index) {
  const userToDelete = users[index];
  if (confirm(`Are you sure you want to delete ${userToDelete.email}?`)) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User deleted successfully.");
    // Refresh users array
    users = JSON.parse(localStorage.getItem("users")) || [];
    renderUserTable();
  }
}

// Toggle admin status
function toggleAdmin(index) {
  users[index].isAdmin = !users[index].isAdmin;
  localStorage.setItem("users", JSON.stringify(users));
  alert(`User role updated to: ${users[index].isAdmin ? "Admin" : "User"}`);
  // Refresh users array
  users = JSON.parse(localStorage.getItem("users")) || [];
  renderUserTable();
}

// Logout
function logout() {
  sessionStorage.removeItem("loggedInUser");
  alert("Logged out!");
  window.location.href = "index.html";
}