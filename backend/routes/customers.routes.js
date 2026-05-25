const router = require('express').Router();
const ctrl   = require('../controllers/customers.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const { validateCustomer }         = require('../middleware/validate.middleware');

router.get('/',       verifyToken,  ctrl.getAll);
router.get('/:id',    verifyToken,  ctrl.getById);
router.post('/',      verifyToken,  validateCustomer, ctrl.create);
router.put('/:id',    verifyToken,  validateCustomer, ctrl.update);
router.delete('/:id', verifyAdmin,  ctrl.remove);

module.exports = router;