const pool    = require('../config/db');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Q       = require('../models/queries');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// ── LOGIN ───────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(Q.getUserByEmail, [email.toLowerCase().trim()]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: 'Invalid email or password.' });

    const user = result.rows[0];

    if (!user.is_active)
      return res.status(403).json({ error: 'Account is deactivated. Contact admin.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: 'Invalid email or password.' });

    const token = generateToken(user);

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error during login.' });
  }
};

// ── REGISTER ────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Name, email, and password are required.' });

    const exists = await pool.query(Q.getUserByEmail, [email.toLowerCase().trim()]);
    if (exists.rows.length > 0)
      return res.status(409).json({ error: 'Email already registered.' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const hashed     = await bcrypt.hash(password, 10);
    const assignRole = role === 'admin' ? 'admin' : 'user';

    const result = await pool.query(Q.createUser, [
      name.trim(),
      email.toLowerCase().trim(),
      hashed,
      assignRole,
    ]);

    const newUser = result.rows[0];
    const token   = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

// ── GET PROFILE ─────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, is_active, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'User not found.' });

    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching profile.' });
  }
};

// ── GET ALL USERS (Admin) ───────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(Q.getAllUsers);
    res.json({ users: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching users.' });
  }
};

// ── TOGGLE USER STATUS (Admin) ──────────────────────────────
const toggleUserStatus = async (req, res) => {
  try {
    const { id }        = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean')
      return res.status(400).json({ error: 'is_active must be a boolean.' });

    const result = await pool.query(Q.updateUserStatus, [is_active, id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'User not found.' });

    res.json({ message: 'User status updated.', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating user.' });
  }
};

// ── DELETE USER (Admin) ─────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id)
      return res.status(400).json({ error: 'Cannot delete your own account.' });

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, name',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'User not found.' });

    res.json({ message: 'User deleted.', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting user.' });
  }
};

// ── VERIFY TOKEN ────────────────────────────────────────────
const verifyToken = (req, res) => {
  res.json({ valid: true, user: req.user });
};

module.exports = {
  login, register, getProfile,
  getAllUsers, toggleUserStatus, deleteUser,
  verifyToken,
};