// ======================================
// PROFIT STACK - PRODUCTS LIST JS
// ======================================

// ======================================
// ADD PRODUCT BUTTON REDIRECT
// ======================================

const addBtn = document.querySelector(".add-btn");

if (addBtn) {

  addBtn.addEventListener("click", function () {

    window.location.href = "products.html";

  });

}

// ======================================
// GET PRODUCTS FROM LOCAL STORAGE
// ======================================

let products =
  JSON.parse(localStorage.getItem("products")) || [];

// ======================================
// TABLE BODY
// ======================================

const tableBody = document.querySelector("tbody");

// ======================================
// RENDER PRODUCTS
// ======================================

function renderProducts(productArray) {

  tableBody.innerHTML = "";

  // EMPTY STATE
  if (productArray.length === 0) {

    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:20px;">
          No Products Available
        </td>
      </tr>
    `;

    return;

  }

  // LOOP PRODUCTS
  productArray.forEach((product, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `

      <td>${product.name}</td>

      <td>₹${product.price}</td>

      <td>${product.quantity}</td>

      <td>${product.status}</td>

      <td>

        <button
          class="delete-btn"
          data-index="${index}"
        >
          Delete
        </button>

      </td>
    `;

    tableBody.appendChild(row);

  });

  attachDeleteEvents();

}

// ======================================
// DELETE BUTTONS
// ======================================

function attachDeleteEvents() {

  const deleteButtons =
    document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {

    button.addEventListener("click", function () {

      const index =
        this.getAttribute("data-index");

      products.splice(index, 1);

      localStorage.setItem(
        "products",
        JSON.stringify(products)
      );

      renderProducts(products);

    });

  });

}

// ======================================
// SEARCH
// ======================================

const searchInput =
  document.querySelector(".search-box input");

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const value =
      this.value.toLowerCase();

    const filteredProducts =
      products.filter((product) => {

        return product.name
          .toLowerCase()
          .includes(value);

      });

    renderProducts(filteredProducts);

  });

}

// ======================================
// INITIAL RENDER
// ======================================

renderProducts(products);