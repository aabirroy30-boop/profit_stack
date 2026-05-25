const router = require('express').Router();
const ctrl   = require('../controllers/sales.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const { validateSale }             = require('../middleware/validate.middleware');

router.get('/',       verifyToken, ctrl.getAll);
router.post('/',      verifyToken, validateSale, ctrl.create);
router.delete('/:id', verifyAdmin, ctrl.remove);

module.exports = router;