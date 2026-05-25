const pool = require('../config/db');
const Q    = require('../models/queries');

const getAll = async (req, res) => {
  try {
    const r = await pool.query(Q.getAllReports);
    res.json({ reports: r.rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const generate = async (req, res) => {
  try {
    const { title, type } = req.body;
    if (!title || !type)
      return res.status(400).json({ error: 'Title and type are required.' });

    const r = await pool.query(Q.createReport, [title, type, req.user.id]);
    res.status(201).json({ message: 'Report generated.', report: r.rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getAll, generate };