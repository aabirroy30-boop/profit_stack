const pool = require('../config/db');

exports.getOverview = async (req, res) => {
  try {
    const [rev, sales, customers, products] = await Promise.all([
      pool.query(`SELECT COALESCE(SUM(total_amount),0) AS val FROM sales WHERE status='completed'`),
      pool.query(`SELECT COUNT(*) AS val FROM sales`),
      pool.query(`SELECT COUNT(*) AS val FROM customers`),
      pool.query(`SELECT COUNT(*) AS val FROM products`)
    ]);
    // Month-over-month revenue change
    const mom = await pool.query(`
      SELECT
        COALESCE(SUM(CASE WHEN DATE_TRUNC('month', sale_date)=DATE_TRUNC('month', NOW()) THEN total_amount END),0) AS this_month,
        COALESCE(SUM(CASE WHEN DATE_TRUNC('month', sale_date)=DATE_TRUNC('month', NOW()-INTERVAL '1 month') THEN total_amount END),0) AS last_month
      FROM sales WHERE status='completed'
    `);
    const thisM = parseFloat(mom.rows[0].this_month);
    const lastM = parseFloat(mom.rows[0].last_month);
    const change = lastM > 0 ? (((thisM - lastM) / lastM) * 100).toFixed(1) : null;
    res.json({
      total_revenue:   parseFloat(rev.rows[0].val),
      total_sales:     parseInt(sales.rows[0].val),
      total_customers: parseInt(customers.rows[0].val),
      total_products:  parseInt(products.rows[0].val),
      mom_change:      change
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getRevenueTrend = async (req, res) => {
  try {
    const { months = 12 } = req.query;
    const result = await pool.query(`
      SELECT
        TO_CHAR(DATE_TRUNC('month', sale_date), 'Mon YY') AS label,
        DATE_TRUNC('month', sale_date) AS period,
        COALESCE(SUM(total_amount), 0) AS revenue,
        COUNT(*) AS orders
      FROM sales
      WHERE sale_date >= NOW() - INTERVAL '${parseInt(months)} months'
        AND status = 'completed'
      GROUP BY period
      ORDER BY period ASC
    `);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getProductPerformance = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.name,
        SUM(s.quantity)     AS units_sold,
        SUM(s.total_amount) AS revenue,
        COUNT(s.id)         AS orders,
        p.stock             AS remaining_stock
      FROM products p
      LEFT JOIN sales s ON s.product_id = p.id AND s.status = 'completed'
      GROUP BY p.id, p.name, p.stock
      ORDER BY revenue DESC NULLS LAST
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCustomerGrowth = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YY') AS label,
        DATE_TRUNC('month', created_at) AS period,
        COUNT(*) AS new_customers,
        SUM(COUNT(*)) OVER (ORDER BY DATE_TRUNC('month', created_at)) AS cumulative
      FROM customers
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY period
      ORDER BY period ASC
    `);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSalesByStatus = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT status, COUNT(*) AS count, COALESCE(SUM(total_amount),0) AS amount
      FROM sales GROUP BY status
    `);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTopCustomers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.name, c.email,
        COUNT(s.id)         AS total_orders,
        SUM(s.total_amount) AS total_spent
      FROM customers c
      JOIN sales s ON s.customer_id = c.id AND s.status = 'completed'
      GROUP BY c.id, c.name, c.email
      ORDER BY total_spent DESC NULLS LAST
      LIMIT 8
    `);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};