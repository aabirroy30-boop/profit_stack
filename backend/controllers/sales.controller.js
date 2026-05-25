const pool = require('../config/db');
const Q    = require('../models/queries');

const getAll = async (req, res) => {
  try {
    const r = await pool.query(Q.getAllSales);
    res.json({ sales: r.rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { customer_id, product_id, quantity, sale_date } = req.body;

    const prod = await client.query(Q.getProductById, [product_id]);
    if (!prod.rows.length) throw new Error('Product not found.');

    const product = prod.rows[0];
    if (product.stock < quantity) throw new Error(`Insufficient stock. Available: ${product.stock}`);

    const total = (product.price * quantity).toFixed(2);
    const date  = sale_date || new Date().toISOString().split('T')[0];

    const sale = await client.query(Q.createSale, [customer_id, product_id, quantity, total, date]);

    await client.query(
      'UPDATE products SET stock = stock - $1 WHERE id = $2',
      [quantity, product_id]
    );

    await client.query(Q.createPayment, [sale.rows[0].id, total, 'cash', 'pending', null]);

    await client.query('COMMIT');
    res.status(201).json({ message: 'Sale recorded.', sale: sale.rows[0] });
  } catch (e) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: e.message });
  } finally {
    client.release();
  }
};

const remove = async (req, res) => {
  try {
    const r = await pool.query(Q.deleteSale, [req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Sale not found.' });
    res.json({ message: 'Sale deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getAll, create, remove };