// ================================
// CUSTOMER PAGE REDIRECTION
// ================================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  if (link.textContent.includes("Customers")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      window.location.href = "customer.html";
    });
  }
});

// ================================
// CREATE SALE BUTTON
// ================================

const createSaleBtn = document.querySelector(".heading button");

createSaleBtn.addEventListener("click", () => {
  alert("Create Sale Feature Coming Soon");
});

// ================================
// FILTER BUTTON
// ================================

const filterBtn = document.querySelector(".table-section button");

filterBtn.addEventListener("click", () => {
  alert("Filter Feature Coming Soon");
});

// ================================
// SEARCH BAR
// ================================

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", () => {
  console.log("Searching:", searchInput.value);
});

// ================================
// NOTIFICATION BELL
// ================================

const bellIcon = document.querySelector(".profile i");

bellIcon.addEventListener("click", () => {
  alert("No new notifications");
});

// ================================
// PROFILE IMAGE CLICK
// ================================

const profileImage = document.querySelector(".profile img");

profileImage.addEventListener("click", () => {
  alert("Profile settings coming soon");
});