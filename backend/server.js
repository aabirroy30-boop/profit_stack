require('dotenv').config();
console.log(process.env.DB_PASSWORD);
const express = require('express');
const cors    = require('cors');
const path    = require('path');


const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Frontend ──────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../frontend')));

// ── API Routes ──────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth.routes'));
app.use('/api/products',  require('./routes/products.routes'));
app.use('/api/customers', require('./routes/customers.routes'));
app.use('/api/sales',     require('./routes/salesroutes'));
app.use('/api/payments',  require('./routes/paymentsroutes'));
app.use('/api/reports',   require('./routes/reportsroutes'));

// ── Dashboard Stats Route ───────────────────────────────────
const pool = require('./config/db');
const Q    = require('./models/queries');

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats  = await pool.query(Q.getDashboardStats);
    const recent = await pool.query(Q.getRecentTransactions);
    const monthly= await pool.query(Q.getMonthlySales);
    res.json({
      stats:        stats.rows[0],
      transactions: recent.rows,
      monthly:      monthly.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard/charts', async (req, res) => {
  try {
    const productPerf   = await pool.query(Q.getProductPerformance);
    const customerGrowth= await pool.query(Q.getCustomerGrowth);
    res.json({
      productPerformance: productPerf.rows,
      customerGrowth:     customerGrowth.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ── 404 Fallback ────────────────────────────────────────────
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found.' });
  }
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Profit Stack running at http://localhost:${PORT}`);
});


