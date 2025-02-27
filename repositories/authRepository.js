class AuthRepository {
    constructor(model) {
        this.model = model;
    }

    async createUser(data) {
        try {
            const user = this.model(data);
            await user.save();

            return user;
        } catch (error) {
            throw new Error("Cannot create user");
        }
    }

    async findUser(email) {
        try {
            const user = await this.model.findOne({ email });

            return user;
        } catch (error) {
            throw new Error("Cannot find user");
        }
    }
}

module.exports = AuthRepository;