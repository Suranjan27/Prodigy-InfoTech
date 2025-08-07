// SIGN UP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      alert("User already exists!");
    } else {
      const isAdmin = email === "admin@gmail.com"; // Updated to match your requirement
      users.push({ email, password, isAdmin });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      window.location.href = "index.html"; // Go to login page
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Check for hardcoded admin credentials first
    if (email === "admin@gmail.com" && password === "12345") {
      // Create admin user in localStorage if it doesn't exist
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const adminExists = users.find(user => user.email === "admin@gmail.com");
      
      if (!adminExists) {
        users.push({ email: "admin@gmail.com", password: "12345", isAdmin: true });
        localStorage.setItem("users", JSON.stringify(users));
      }
      
      sessionStorage.setItem("loggedInUser", "admin@gmail.com");
      alert("Admin login successful!");
      window.location.href = "admin.html";
      return;
    }

    // Check for regular users in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      sessionStorage.setItem("loggedInUser", email);
      alert("Login successful!");

      if (validUser.isAdmin) {
        window.location.href = "admin.html"; // Admin redirect
      } else {
        window.location.href = "oasis.html"; // Normal user
      }
    } else {
      alert("Invalid email or password!");
    }
  });
}

// Admin function
function goToAdmin() {
    const currentUser = sessionStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === currentUser);

    if ((user && user.isAdmin) || currentUser === "admin@gmail.com") {
      window.location.href = "admin.html";
    } else {
      alert("Access denied! You are not an admin.");
    }
}