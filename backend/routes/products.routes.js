const router = require('express').Router();
const ctrl   = require('../controllers/products.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const { validateProduct }          = require('../middleware/validate.middleware');

router.get('/',       verifyToken,  ctrl.getAll);
router.get('/:id',    verifyToken,  ctrl.getById);
router.post('/',      verifyAdmin,  validateProduct, ctrl.create);
router.put('/:id',    verifyAdmin,  validateProduct, ctrl.update);
router.delete('/:id', verifyAdmin,  ctrl.remove);

module.exports = router;