const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UserRepository } = require('../repositories');

const userRepository = new UserRepository(User);

class AuthService {
    async signup(userData) {
        try {
            const user = await userRepository.createUser(userData);

            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});

            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    async signin(email, password) {
        try {
            const user = await userRepository.findUser(email);
            const passCheck = await User.comparePasswords(password, user.password);

            if(!user || !passCheck) {
                return new Error('Invalid email or password');
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'});

            return { user, token };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;