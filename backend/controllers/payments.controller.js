const pool = require('../config/db');
const Q    = require('../models/queries');

const getAll = async (req, res) => {
  try {
    const r = await pool.query(Q.getAllPayments);
    res.json({ payments: r.rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create = async (req, res) => {
  try {
    const { sale_id, amount, method, status } = req.body;
    const paid_at = status === 'completed' ? new Date() : null;
    const r = await pool.query(Q.createPayment, [sale_id, amount, method, status || 'pending', paid_at]);
    res.status(201).json({ message: 'Payment recorded.', payment: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'completed', 'failed', 'refunded'];
    if (!allowed.includes(status))
      return res.status(400).json({ error: 'Invalid status value.' });
    const paid_at = status === 'completed' ? new Date() : null;
    const r = await pool.query(Q.updatePayment, [status, paid_at, req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Payment not found.' });
    res.json({ message: 'Payment updated.', payment: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getAll, create, updateStatus };