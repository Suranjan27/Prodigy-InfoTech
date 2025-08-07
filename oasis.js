// pro.js

// Change navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.style.backgroundColor = window.scrollY > 50 ? "rgba(0, 0, 0, 0.8)" : "transparent";
});

// Show dynamic content based on menu item
function showContent(section) {
  const content = document.getElementById("content");
  const sections = {
    home: "This is the home page.",
    about: "This is the about page.",
    services: "This is the services page.",
    contact: "This is the contact page."
  };
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  const message = sections[section] || "Welcome to my website.";

  content.innerHTML = `
    <h1>${title}</h1>
    <p>${message}</p>
  `;
}
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDN3jRgIN1ZufI-z0Rz-WmsrG3Orwx24VQ",
  authDomain: "user-authentication-913df.firebaseapp.com",
  projectId: "user-authentication-913df",
  appId: "1:408789701649:web:cb8fa5b3ffe8c9c33dcdb0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Logout button action
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      sessionStorage.removeItem("loggedInUser");
      window.location.href = "index.html"; // Redirect to login page
    });
  });
}
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
     sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // ✅ Redirect to login page
  });
});
