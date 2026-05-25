const router  = require('express').Router();
const ctrl    = require('../controllers/auth.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const { validateLogin }            = require('../middleware/validate.middleware');

// Public
router.post('/login',    validateLogin, ctrl.login);
router.post('/register', ctrl.register);

// Protected
router.get('/profile',       verifyToken,  ctrl.getProfile);
router.get('/verify',        verifyToken,  ctrl.verifyToken);

// Admin only
router.get('/users',         verifyAdmin,  ctrl.getAllUsers);
router.patch('/users/:id',   verifyAdmin,  ctrl.toggleUserStatus);
router.delete('/users/:id',  verifyAdmin,  ctrl.deleteUser);

module.exports = router;