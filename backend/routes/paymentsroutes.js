const router = require('express').Router();
const ctrl   = require('../controllers/payments.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

router.get('/',        verifyToken, ctrl.getAll);
router.post('/',       verifyToken, ctrl.create);
router.patch('/:id',   verifyAdmin, ctrl.updateStatus);

module.exports = router;