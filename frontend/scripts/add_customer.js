// PRODUCT INPUT ELEMENTS

const productInput = document.querySelector(".product-row input");
const plusButton = document.querySelector(".plus-btn");
const productTags = document.querySelector(".product-tags");

const saveButton = document.querySelector(".save-btn");
const cancelButton = document.querySelector(".cancel-btn");

let products = [];

/* ------------------------------
   ADD PRODUCT FUNCTION
------------------------------ */

function addProduct() {

  const productName = productInput.value.trim();

  // EMPTY CHECK

  if (productName === "") {
    return;
  }

  // DUPLICATE CHECK

  if (products.includes(productName)) {
    productInput.value = "";
    return;
  }

  // PUSH INTO ARRAY

  products.push(productName);

  // CREATE TAG

  const tag = document.createElement("div");

  tag.classList.add("tag");

  tag.innerHTML = `
    ${productName}
    <i class="fa-solid fa-xmark"></i>
  `;

  // REMOVE PRODUCT

  const removeIcon = tag.querySelector("i");

  removeIcon.addEventListener("click", () => {

    products = products.filter(
      (item) => item !== productName
    );

    tag.remove();

  });

  // APPEND TAG

  productTags.appendChild(tag);

  // CLEAR INPUT

  productInput.value = "";

}

/* ------------------------------
   PLUS BUTTON CLICK
------------------------------ */

plusButton.addEventListener("click", addProduct);

/* ------------------------------
   ENTER KEY ADD PRODUCT
------------------------------ */

productInput.addEventListener("keypress", (event) => {

  if (event.key === "Enter") {

    event.preventDefault();

    addProduct();

  }

});

/* ------------------------------
   SAVE CUSTOMER
------------------------------ */

saveButton.addEventListener("click", (event) => {

  event.preventDefault();

  // GET FORM VALUES

  const fullName =
    document.querySelector(
      'input[placeholder="e.g. Jonathan Doe"]'
    ).value;

  const phoneNumber =
    document.querySelector(
      'input[placeholder="+1 (555) 000-0000"]'
    ).value;

  const email =
    document.querySelector(
      'input[type="email"]'
    ).value;

  // CUSTOMER OBJECT

  const customer = {
    name: fullName,
    phone: phoneNumber,
    email: email,
    products: products
  };

  // GET OLD CUSTOMERS

  let customers =
    JSON.parse(localStorage.getItem("customers")) || [];

  // PUSH NEW CUSTOMER

  customers.push(customer);

  // SAVE TO LOCAL STORAGE

  localStorage.setItem(
    "customers",
    JSON.stringify(customers)
  );

  // REDIRECT

  window.location.href = "customer.html";

});

/* ------------------------------
   CANCEL BUTTON
------------------------------ */

cancelButton.addEventListener("click", () => {

  window.location.href = "customer.html";

});