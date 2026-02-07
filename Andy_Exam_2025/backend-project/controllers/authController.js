const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM Users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = { id: user.userId, username: user.username };
            res.json({ message: 'Login successful', user: req.session.user });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Could not logout' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
};

exports.checkAuth = (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
};

exports.getSecurityQuestion = async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await db.execute('SELECT security_question FROM Users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'System identity not discovered' });
        }
        res.json({ question: rows[0].security_question });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { username, answer, newPassword } = req.body;
    try {
        const [rows] = await db.execute('SELECT security_answer FROM Users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'System identity not discovered' });
        }

        if (rows[0].security_answer !== answer) {
            return res.status(401).json({ error: 'Security verification failed' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute('UPDATE Users SET password = ? WHERE username = ?', [hashedPassword, username]);

        res.json({ message: 'Credential restoration successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
