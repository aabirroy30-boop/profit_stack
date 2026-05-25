// =====================================
// NAVIGATION BUTTONS
// =====================================

const loginBtn = document.querySelector(".login-btn");
const bottomLogin = document.querySelector(".bottom-text span");
const createBtn = document.querySelector(".create-btn");

// Redirect to login page
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "admin_login.html";
});

// Redirect from bottom text
bottomLogin.addEventListener("click", () => {
  window.location.href = "admin_login.html";
});

// Current page
createBtn.addEventListener("click", () => {
  window.location.href = "admin_createacc.html";
});

// =====================================
// PASSWORD SHOW / HIDE
// =====================================

const passwordInput = document.querySelector(
  '.password-row input[type="password"]'
);

const eyeIcon = document.querySelector(".fa-eye");

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

// =====================================
// FORM VALIDATION
// FRONTEND ONLY
// =====================================

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  // INPUTS

  const fullName = document.querySelector(
    'input[type="text"]'
  ).value;

  const email = document.querySelector(
    'input[type="email"]'
  ).value;

  const textInputs = document.querySelectorAll(
    'input[type="text"]'
  );

  const shopName = textInputs[1].value;

  const passwordInputs = document.querySelectorAll(
    'input[type="password"]'
  );

  const password = passwordInputs[0].value;
  const confirmPassword = passwordInputs[1].value;

  const termsCheckbox = document.querySelector(
    '.terms input[type="checkbox"]'
  );

  // VALIDATION

  if (
    fullName === "" ||
    email === "" ||
    shopName === "" ||
    password === "" ||
    confirmPassword === ""
  ) {

    alert("Please fill all fields");

    return;
  }

  if (password !== confirmPassword) {

    alert("Passwords do not match");

    return;
  }

  if (!termsCheckbox.checked) {

    alert("Please accept Terms & Conditions");

    return;
  }

  // SUCCESS

  alert("Account Created Successfully");

  // Redirect to login page

  window.location.href = "admin_login.html";

});