const router = require('express').Router();
const ctrl   = require('../controllers/reports.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

router.get('/',    verifyToken, ctrl.getAll);
router.post('/',   verifyAdmin, ctrl.generate);

module.exports = router;