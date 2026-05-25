// BUTTONS

const getStartedBtn = document.querySelector(".primary-btn");
const createAccountBtn = document.querySelector(".secondary-btn");

// REDIRECT TO CREATE ACCOUNT PAGE

getStartedBtn.addEventListener("click", () => {
  window.location.href = "admin_createacc.html";
});

createAccountBtn.addEventListener("click", () => {
  window.location.href = "admin_login.html";
});