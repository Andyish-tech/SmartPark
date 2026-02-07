const db = require('../config/db');

exports.getEmployees = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT e.*, d.departmentName 
            FROM Employee e 
            LEFT JOIN Department d ON e.departmentCode = d.departmentCode
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const {
        employeeNumber, firstName, lastName, position,
        address, telephone, gender, hiredDate, departmentCode
    } = req.body;
    try {
        await db.execute(
            `INSERT INTO Employee (
                employeeNumber, firstName, lastName, position, 
                address, telephone, gender, hiredDate, departmentCode
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode]
        );
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
