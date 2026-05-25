const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const pool    = require('../config/db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', requireAdmin, async (req, res) => {
  try {
    const r = await pool.query(`SELECT id, username, email, role, is_active, created_at FROM users ORDER BY created_at DESC`);
    res.json(r.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { username, email, role, is_active, password } = req.body;
  try {
    const ex = await pool.query(`SELECT * FROM users WHERE id=$1`, [req.params.id]);
    if (!ex.rows.length) return res.status(404).json({ error: 'User not found' });
    const u = ex.rows[0];
    const hash = password ? await bcrypt.hash(password, 10) : u.password_hash;
    const r = await pool.query(
      `UPDATE users SET username=$1, email=$2, role=$3, is_active=$4, password_hash=$5, updated_at=NOW() WHERE id=$6 RETURNING id, username, email, role, is_active`,
      [username??u.username, email??u.email, role??u.role, is_active??u.is_active, hash, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const r = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING id`, [req.params.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;