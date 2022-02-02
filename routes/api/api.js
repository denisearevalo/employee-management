const router = require('inquire').Router();

const departmentRoutes = require('./department');
const roleRoutes = require('./role');
const employeeRoutes = require('./employee');


router.use('/department', departmentRoutes);
router.use('/role', roleRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;