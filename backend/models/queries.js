// ── Dashboard ──────────────────────────────────────────────
const getDashboardStats = `
  SELECT
    (SELECT COUNT(*) FROM customers)                          AS total_customers,
    (SELECT COUNT(*) FROM products)                           AS total_products,
    (SELECT COUNT(*) FROM sales)                              AS total_sales,
    (SELECT COALESCE(SUM(amount),0) FROM payments
     WHERE status = 'completed')                              AS total_revenue;
`;

const getRecentTransactions = `
  SELECT s.id, c.name AS customer, p.name AS product,
         s.quantity, s.total_amount, s.sale_date,
         pay.status AS payment_status
  FROM   sales s
  JOIN   customers c ON s.customer_id = c.id
  JOIN   products  p ON s.product_id  = p.id
  LEFT JOIN payments pay ON pay.sale_id = s.id
  ORDER BY s.created_at DESC
  LIMIT 10;
`;

const getMonthlySales = `
  SELECT TO_CHAR(sale_date, 'Mon YYYY') AS month,
         SUM(total_amount)              AS revenue,
         COUNT(*)                       AS sales_count
  FROM   sales
  WHERE  sale_date >= CURRENT_DATE - INTERVAL '6 months'
  GROUP BY TO_CHAR(sale_date, 'Mon YYYY'), DATE_TRUNC('month', sale_date)
  ORDER BY DATE_TRUNC('month', sale_date);
`;

// ── Users ───────────────────────────────────────────────────
const getAllUsers      = `SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC;`;
const getUserByEmail  = `SELECT * FROM users WHERE email = $1;`;
const createUser      = `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role;`;
const updateUserStatus= `UPDATE users SET is_active = $1 WHERE id = $2 RETURNING id, name, is_active;`;

// ── Products ────────────────────────────────────────────────
const getAllProducts   = `SELECT * FROM products ORDER BY created_at DESC;`;
const getProductById  = `SELECT * FROM products WHERE id = $1;`;
const createProduct   = `INSERT INTO products (name,description,price,stock,category) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
const updateProduct   = `UPDATE products SET name=$1,description=$2,price=$3,stock=$4,category=$5 WHERE id=$6 RETURNING *;`;
const deleteProduct   = `DELETE FROM products WHERE id = $1 RETURNING id;`;

// ── Customers ───────────────────────────────────────────────
const getAllCustomers  = `SELECT * FROM customers ORDER BY created_at DESC;`;
const getCustomerById = `SELECT * FROM customers WHERE id = $1;`;
const createCustomer  = `INSERT INTO customers (name,email,phone) VALUES ($1,$2,$3) RETURNING *;`;
const updateCustomer  = `UPDATE customers SET name=$1,email=$2,phone=$3 WHERE id=$4 RETURNING *;`;
const deleteCustomer  = `DELETE FROM customers WHERE id = $1 RETURNING id;`;

// ── Sales ───────────────────────────────────────────────────
const getAllSales = `
  SELECT s.id, c.name AS customer, p.name AS product,
         s.quantity, s.total_amount, s.sale_date,
         pay.status AS payment_status, pay.method
  FROM   sales s
  JOIN   customers c ON s.customer_id = c.id
  JOIN   products  p ON s.product_id  = p.id
  LEFT JOIN payments pay ON pay.sale_id = s.id
  ORDER BY s.created_at DESC;
`;
const createSale = `INSERT INTO sales (customer_id,product_id,quantity,total_amount,sale_date) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
const deleteSale = `DELETE FROM sales WHERE id = $1 RETURNING id;`;

const getProductPerformance = `
  SELECT p.name, SUM(s.quantity) AS units_sold, SUM(s.total_amount) AS revenue
  FROM   sales s JOIN products p ON s.product_id = p.id
  GROUP BY p.name ORDER BY revenue DESC LIMIT 8;
`;

const getCustomerGrowth = `
  SELECT TO_CHAR(created_at, 'Mon YYYY') AS month, COUNT(*) AS new_customers
  FROM   customers
  WHERE  created_at >= CURRENT_DATE - INTERVAL '6 months'
  GROUP BY TO_CHAR(created_at, 'Mon YYYY'), DATE_TRUNC('month', created_at)
  ORDER BY DATE_TRUNC('month', created_at);
`;

// ── Payments ────────────────────────────────────────────────
const getAllPayments = `
  SELECT pay.id, pay.amount, pay.method, pay.status, pay.paid_at,
         c.name AS customer, p.name AS product, s.sale_date
  FROM   payments pay
  JOIN   sales s    ON pay.sale_id    = s.id
  JOIN   customers c ON s.customer_id = c.id
  JOIN   products  p ON s.product_id  = p.id
  ORDER BY pay.created_at DESC;
`;
const createPayment  = `INSERT INTO payments (sale_id,amount,method,status,paid_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
const updatePayment  = `UPDATE payments SET status=$1, paid_at=$2 WHERE id=$3 RETURNING *;`;

// ── Reports ─────────────────────────────────────────────────
const getAllReports  = `SELECT r.*, u.name AS generated_by_name FROM reports r LEFT JOIN users u ON r.generated_by = u.id ORDER BY r.created_at DESC;`;
const createReport  = `INSERT INTO reports (title,type,generated_by) VALUES ($1,$2,$3) RETURNING *;`;

module.exports = {
  getDashboardStats, getRecentTransactions, getMonthlySales,
  getAllUsers, getUserByEmail, createUser, updateUserStatus,
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
  getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer,
  getAllSales, createSale, deleteSale, getProductPerformance, getCustomerGrowth,
  getAllPayments, createPayment, updatePayment,
  getAllReports, createReport,
};