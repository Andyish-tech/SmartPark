const db = require('../config/db');

exports.getSalaries = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT s.*, e.firstName, e.lastName 
            FROM Salary s 
            JOIN Employee e ON s.employeeNumber = e.employeeNumber
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSalary = async (req, res) => {
    const { employeeNumber, grossSalary, totalDeduction, month } = req.body;
    const netSalary = parseFloat(grossSalary) - parseFloat(totalDeduction);
    try {
        await db.execute(
            'INSERT INTO Salary (employeeNumber, grossSalary, totalDeduction, netSalary, month) VALUES (?, ?, ?, ?, ?)',
            [employeeNumber, grossSalary, totalDeduction, netSalary, month]
        );
        res.status(201).json({ message: 'Salary record created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSalary = async (req, res) => {
    const { id } = req.params;
    const { grossSalary, totalDeduction, month } = req.body;
    const netSalary = parseFloat(grossSalary) - parseFloat(totalDeduction);
    try {
        await db.execute(
            'UPDATE Salary SET grossSalary = ?, totalDeduction = ?, netSalary = ?, month = ? WHERE salaryId = ?',
            [grossSalary, totalDeduction, netSalary, month, id]
        );
        res.json({ message: 'Salary record updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSalary = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM Salary WHERE salaryId = ?', [id]);
        res.json({ message: 'Salary record deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
