const { AuthService } = require('../services');
const authService = new AuthService();

class AuthController {
    async signup(req, res) {
        try {
            const {user, token} = await authService.signup(req.body);
            
            return res.status(201).json({
                data:{ user, token }, 
                success: true, 
                error: null, 
                message: "successfully registered user"
            });
        } catch(error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async signin(req, res) {
        try {
            const { email, password} = req.body;

            const {user, token} = await authService.signin(email, password);

            return res.status(201).json({
                data:{ user, token }, 
                success: true, 
                error: null, 
                message: "successfully logged in user"
            });
        } catch(error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController;