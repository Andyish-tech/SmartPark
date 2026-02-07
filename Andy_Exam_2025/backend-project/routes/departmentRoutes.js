const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', departmentController.getDepartments);
router.post('/', departmentController.createDepartment);

module.exports = router;
