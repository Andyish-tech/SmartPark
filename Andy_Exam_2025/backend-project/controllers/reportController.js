const db = require('../config/db');

exports.getPayrollReport = async (req, res) => {
    const { month } = req.query; // YYYY-MM
    try {
        const [rows] = await db.execute(`
            SELECT 
                e.firstName, 
                e.lastName, 
                e.position, 
                d.departmentName, 
                s.netSalary
            FROM Salary s
            JOIN Employee e ON s.employeeNumber = e.employeeNumber
            JOIN Department d ON e.departmentCode = d.departmentCode
            WHERE s.month = ?
        `, [month]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
