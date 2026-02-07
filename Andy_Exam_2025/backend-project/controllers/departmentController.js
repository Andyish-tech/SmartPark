const db = require('../config/db');

exports.getDepartments = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Department');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createDepartment = async (req, res) => {
    const { departmentCode, departmentName, grossSalary, totalDeduction } = req.body;
    try {
        await db.execute(
            'INSERT INTO Department (departmentCode, departmentName, grossSalary, totalDeduction) VALUES (?, ?, ?, ?)',
            [departmentCode, departmentName, grossSalary, totalDeduction]
        );
        res.status(201).json({ message: 'Department created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
