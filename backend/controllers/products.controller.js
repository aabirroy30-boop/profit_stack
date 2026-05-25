const pool = require('../config/db');
const Q    = require('../models/queries');

const getAll  = async (req, res) => {
  try {
    const r = await pool.query(Q.getAllProducts);
    res.json({ products: r.rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try {
    const r = await pool.query(Q.getProductById, [req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create  = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const r = await pool.query(Q.createProduct, [name, description, price, stock, category]);
    res.status(201).json({ message: 'Product created.', product: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const update  = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const r = await pool.query(Q.updateProduct, [name, description, price, stock, category, req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Product not found.' });
    res.json({ message: 'Product updated.', product: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const remove  = async (req, res) => {
  try {
    const r = await pool.query(Q.deleteProduct, [req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getAll, getById, create, update, remove };