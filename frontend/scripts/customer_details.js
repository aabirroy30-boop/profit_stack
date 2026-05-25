// customer_details.js

// ===============================
// SIDEBAR PAGE REDIRECTION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ALL SIDEBAR LINKS

  const menuLinks = document.querySelectorAll(".menu li a");

  // PAGE ROUTES

  const routes = {
    "Dashboard": "admin_dashboard.html",
    "Customers": "customer.html",
    "Products": "products.html",
    "Sales": "sales.html",
    "Analytics": "analytics.html",
    "Reports": "reports.html",
    "Payments": "payments.html"
  };

  // LOOP THROUGH LINKS

  menuLinks.forEach(link => {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      // GET MENU TEXT

      const pageName = link.textContent.trim();

      // REDIRECT

      if (routes[pageName]) {

        window.location.href = routes[pageName];

      }

    });

  });

});


// ===============================
// CUSTOMER DETAILS DATA
// ===============================

// GET SELECTED CUSTOMER

const selectedCustomer =
  JSON.parse(localStorage.getItem("selectedCustomer"));

// HTML ELEMENTS

const customerName =
  document.getElementById("customerName");

const customerEmail =
  document.getElementById("customerEmail");

const customerPhone =
  document.getElementById("customerPhone");

const customerAvatar =
  document.getElementById("customerAvatar");

const totalProducts =
  document.getElementById("totalProducts");

const productsCount =
  document.getElementById("productsCount");

const productTableBody =
  document.getElementById("productTableBody");


// ===============================
// SHOW CUSTOMER DATA
// ===============================

if (selectedCustomer) {

  // NAME

  customerName.textContent =
    selectedCustomer.name;

  // EMAIL

  customerEmail.textContent =
    selectedCustomer.email;

  // PHONE

  customerPhone.textContent =
    selectedCustomer.phone;

  // AVATAR LETTER

  customerAvatar.textContent =
    selectedCustomer.name.charAt(0).toUpperCase();

  // PRODUCTS ARRAY

  const products =
    selectedCustomer.products || [];

  // PRODUCT COUNT

  totalProducts.textContent =
    products.length;

  productsCount.textContent =
    products.length;

  // CLEAR TABLE

  productTableBody.innerHTML = "";

  // ADD PRODUCTS TO TABLE

  products.forEach(product => {

    productTableBody.innerHTML += `
    
      <tr>

        <td>${product}</td>

        <td>General</td>

        <td>
          <span class="product-status">
            Purchased
          </span>
        </td>

      </tr>

    `;

  });

}


// ===============================
// NO CUSTOMER FOUND
// ===============================

else {

  alert("No customer data found!");

  window.location.href = "customer.html";

}