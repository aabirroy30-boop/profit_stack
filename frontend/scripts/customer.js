// TABLE BODY
const customerTableBody =
  document.getElementById("customerTableBody");

// EMPTY ROW
const emptyRow =
  document.getElementById("emptyRow");

// CUSTOMER COUNT TEXT
const customerCount =
  document.getElementById("customerCount");


// GET CUSTOMERS FROM LOCAL STORAGE
const customers =
  JSON.parse(localStorage.getItem("customers")) || [];


// IF NO CUSTOMERS
if (customers.length === 0) {

  emptyRow.style.display = "table-row";

  customerCount.innerText =
    "Showing 0 customers";

} else {

  // HIDE EMPTY ROW
  emptyRow.style.display = "none";

  // LOOP THROUGH CUSTOMERS
  customers.forEach((customer, index) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `

      <td>

        <div class="customer">

          <div class="avatar">
            ${customer.name.charAt(0).toUpperCase()}
          </div>

          <div>

            <a
              href="customer_details.html?id=${index}"
              class="customer-link"
            >
              ${customer.name}
            </a>

            <span>
              ${customer.products.length} Products
            </span>

          </div>

        </div>

      </td>

      <td>${customer.email}</td>

      <td>${customer.phone}</td>

      <td>${customer.products.length}</td>

      <td>

        <span class="status active-status">
          Active
        </span>

      </td>
    `;

    customerTableBody.appendChild(tr);

  });

  // UPDATE COUNT
  customerCount.innerText =
    `Showing ${customers.length} customers`;
}



// SIDEBAR REDIRECTS

const menuLinks =
  document.querySelectorAll(".menu li a");

menuLinks[0].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "dashboard.html";

});

menuLinks[1].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "sales.html";

});

menuLinks[2].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "products.html";

});

menuLinks[3].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "customer.html";

});

menuLinks[4].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "analytics.html";

});

menuLinks[5].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "reports.html";

});

menuLinks[6].addEventListener("click", (e) => {

  e.preventDefault();

  window.location.href = "payments.html";

});