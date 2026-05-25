// ============================
// SELECT FORM
// ============================

const productForm = document.getElementById("productForm");

// ============================
// SIDEBAR NAVIGATION
// ============================

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {

  link.addEventListener("click", function (e) {

    e.preventDefault();

    const page =
      link.textContent.trim().toLowerCase();

    // ============================
    // PAGE REDIRECTS
    // ============================

    switch (page) {

      case "dashboard":
        window.location.href = "./dashboard.html";
        break;

      case "customers":
        window.location.href = "./customer.html";
        break;

      case "products":
        window.location.href = "./products.html";
        break;

      case "sales":
        window.location.href = "./sales.html";
        break;

      case "reports":
        window.location.href = "./reports.html";
        break;

      case "settings":
        window.location.href = "./settings.html";
        break;

      default:
        console.log("Page not found");

    }

  });

});

// ============================
// FORM SUBMIT
// ============================

productForm.addEventListener("submit", function (e) {

  // Prevent page reload
  e.preventDefault();

  // ============================
  // GET INPUT VALUES
  // ============================

  const productName =
    document.getElementById("productName").value;

  const productPrice =
    document.getElementById("productPrice").value;

  const productCategory =
    document.getElementById("productCategory").value;

  const stockStatus =
    document.getElementById("stockStatus").value;

  const productDescription =
    document.getElementById("productDescription").value;

  // ============================
  // PRODUCT OBJECT
  // ============================

  const product = {

    name: productName,

    price: productPrice,

    category: productCategory,

    status: stockStatus,

    description: productDescription,

    quantity: 1

  };

  // ============================
  // GET OLD PRODUCTS
  // ============================

  let products =
    JSON.parse(localStorage.getItem("products")) || [];

  // ============================
  // PUSH NEW PRODUCT
  // ============================

  products.push(product);

  // ============================
  // SAVE TO LOCAL STORAGE
  // ============================

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

  // ============================
  // SUCCESS MESSAGE
  // ============================

  alert("Product Added Successfully!");

  // ============================
  // RESET FORM
  // ============================

  productForm.reset();

  // ============================
  // REDIRECT TO PRODUCT LIST
  // ============================

  window.location.href =
    "./products_list.html";

});