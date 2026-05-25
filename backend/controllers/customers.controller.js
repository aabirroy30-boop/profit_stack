const pool = require('../config/db');
const Q    = require('../models/queries');

const getAll  = async (req, res) => {
  try {
    const r = await pool.query(Q.getAllCustomers);
    res.json({ customers: r.rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try {
    const r = await pool.query(Q.getCustomerById, [req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Customer not found.' });
    res.json({ customer: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create  = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const r = await pool.query(Q.createCustomer, [name, email, phone]);
    res.status(201).json({ message: 'Customer created.', customer: r.rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Email already exists.' });
    res.status(500).json({ error: e.message });
  }
};

const update  = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const r = await pool.query(Q.updateCustomer, [name, email, phone, req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Customer not found.' });
    res.json({ message: 'Customer updated.', customer: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const remove  = async (req, res) => {
  try {
    const r = await pool.query(Q.deleteCustomer, [req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Customer not found.' });
    res.json({ message: 'Customer deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getAll, getById, create, update, remove };