const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/overview',          analyticsController.getOverview);
router.get('/revenue-trend',     analyticsController.getRevenueTrend);
router.get('/product-performance', analyticsController.getProductPerformance);
router.get('/customer-growth',   analyticsController.getCustomerGrowth);
router.get('/sales-by-status',   analyticsController.getSalesByStatus);
router.get('/top-customers',     analyticsController.getTopCustomers);

module.exports = router;