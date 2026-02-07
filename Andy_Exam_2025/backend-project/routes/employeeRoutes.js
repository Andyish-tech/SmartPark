const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', employeeController.getEmployees);
router.post('/', employeeController.createEmployee);

module.exports = router;
