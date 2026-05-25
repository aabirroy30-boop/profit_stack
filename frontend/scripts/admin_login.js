// ===============================
// NAVBAR BUTTONS
// ===============================

const createAccountBtn = document.querySelector(".create-btn");
const loginBtn = document.querySelector(".login-btn");

// Redirect to signup page
createAccountBtn.addEventListener("click", () => {
  window.location.href = "admin_createacc.html";
});

// Current page
loginBtn.addEventListener("click", () => {
  window.location.href = "admin_login.html";
});

// ===============================
// PASSWORD SHOW/HIDE
// ===============================

const passwordInput = document.querySelector(
  'input[type="password"]'
);

const eyeIcon = document.querySelector(
  ".fa-eye"
);

eyeIcon.addEventListener("click", () => {

  if (passwordInput.type === "password") {

    passwordInput.type = "text";

    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");

  } else {

    passwordInput.type = "password";

    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }

});

// ===============================
// LOGIN BUTTON
// FRONTEND ONLY
// ===============================

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const email = document.querySelector(
    'input[type="email"]'
  ).value;

  const password = document.querySelector(
    'input[type="password"]'
  ).value;

  // Simple frontend validation

  if (email === "" || password === "") {

    alert("Please fill all fields");

    return;
  }

  // Temporary frontend redirect

  alert("Login Successful");

  window.location.href = "admin_dashboard.html";

});