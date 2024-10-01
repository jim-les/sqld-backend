// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    const { username, email, password, firstName, lastName, address, dateOfBirth, ssn } = req.body;

    console.log(req.body);
    
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            address,
            dateOfBirth,
            ssn,
        });

        res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log('Login successful');
        // Here you might want to create a session or token for the user
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { signup, login };
