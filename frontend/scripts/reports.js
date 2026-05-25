// ==============================
// CUSTOMER DATA
// ==============================

const customers = [

  {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    total: "$2,450",
    products: [
      "Macbook Pro",
      "Gaming Mouse",
      "Mechanical Keyboard"
    ]
  },

  {
    name: "Aarav Roy",
    email: "aarav@gmail.com",
    total: "$1,120",
    products: [
      "Monitor",
      "Headphones"
    ]
  },

  {
    name: "Souvik Das",
    email: "souvik@gmail.com",
    total: "$5,720",
    products: [
      "RTX 4090",
      "Gaming Chair",
      "CPU Cooler"
    ]
  },

  {
    name: "Debayan Sen",
    email: "debayan@gmail.com",
    total: "$840",
    products: [
      "SSD",
      "RAM"
    ]
  }

];

// ==============================
// SELECTORS
// ==============================

const customerGrid =
  document.getElementById("customerGrid");

const billModal =
  document.getElementById("billModal");

const billContent =
  document.getElementById("billContent");

const closeModal =
  document.getElementById("closeModal");

const searchInput =
  document.getElementById("searchInput");

// ==============================
// RENDER CUSTOMERS
// ==============================

function renderCustomers(data){

  customerGrid.innerHTML = "";

  data.forEach((customer)=>{

    const card =
      document.createElement("div");

    card.classList.add("customer-card");

    card.innerHTML = `

      <h3>${customer.name}</h3>

      <p>${customer.email}</p>

    `;

    // CLICK EVENT

    card.addEventListener("click", ()=>{

      openBill(customer);

    });

    customerGrid.appendChild(card);

  });

}

// ==============================
// OPEN BILL
// ==============================

function openBill(customer){

  let productsHTML = "";

  customer.products.forEach((product)=>{

    productsHTML += `

      <div class="bill-row">

        <span>${product}</span>

        <span>✔</span>

      </div>

    `;

  });

  billContent.innerHTML = `

    <div class="bill-details">

      <div class="bill-row">
        <strong>Customer</strong>
        <span>${customer.name}</span>
      </div>

      <div class="bill-row">
        <strong>Email</strong>
        <span>${customer.email}</span>
      </div>

      ${productsHTML}

      <div class="bill-row total">
        <strong>Total</strong>
        <span>${customer.total}</span>
      </div>

    </div>

  `;

  billModal.style.display = "flex";

}

// ==============================
// CLOSE MODAL
// ==============================

closeModal.addEventListener("click", ()=>{

  billModal.style.display = "none";

});

// ==============================
// SEARCH FUNCTIONALITY
// ==============================

searchInput.addEventListener("input",(e)=>{

  const value =
    e.target.value.toLowerCase();

  const filteredCustomers =
    customers.filter((customer)=>

      customer.name
      .toLowerCase()
      .includes(value)

    );

  renderCustomers(filteredCustomers);

});

// ==============================
// INITIAL RENDER
// ==============================

renderCustomers(customers);